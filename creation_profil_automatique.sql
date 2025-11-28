-- =================================================================
-- SCRIPT DE CRÉATION DE PROFIL AUTOMATIQUE (Version 2)
-- =================================================================
-- Ce script doit être exécuté dans l'éditeur SQL de votre projet Supabase.
-- Il met en place une fonction et un déclencheur pour créer automatiquement
-- un profil utilisateur complet lors de l'inscription.
-- =================================================================

-- 1. MISE À JOUR DE LA FONCTION 'handle_new_user'
-- Cette fonction est maintenant étendue pour extraire toutes les données
-- du formulaire d'inscription (passées via les métadonnées) et les
-- insérer dans la table 'profiles'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Cette fonction insère un profil en utilisant les métadonnées de l'utilisateur
  -- et les valeurs par défaut de la base de données pour les timestamps.
  insert into public.profiles (
    id,
    created_at,
    updated_at,
    email,
    first_name,
    last_name,
    date_of_birth,
    gender,
    blood_type,
    phone,
    city,
    custom_city,
    region,
    address,
    latitude,
    longitude
  )
  values (
    new.id,
    DEFAULT, -- Laisse la base de données gérer la valeur de created_at
    DEFAULT, -- Laisse la base de données gérer la valeur de updated_at
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    (new.raw_user_meta_data->>'date_of_birth')::date,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'blood_type',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'custom_city',
    new.raw_user_meta_data->>'region',
    new.raw_user_meta_data->>'address',
    (new.raw_user_meta_data->>'latitude')::double precision,
    (new.raw_user_meta_data->>'longitude')::double precision
  );
  return new;
end;
$$;

-- 2. CRÉATION DU DÉCLENCHEUR (si non existant)
-- Ce déclencheur s'active après chaque inscription et appelle la fonction ci-dessus.
-- "create or replace" garantit qu'il est toujours à jour.
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. NETTOYAGE DES ANCIENNES POLITIQUES (sécurité)
-- Supprime les politiques précédentes pour éviter les conflits.
DROP POLICY IF EXISTS "Les utilisateurs peuvent créer leur propre profil." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir leur propre profil." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent consulter leur propre profil." ON public.profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent mettre à jour leur propre profil." ON public.profiles;


-- 4. CRÉATION DES NOUVELLES POLITIQUES DE SÉCURITÉ (RLS)
-- Ces politiques sont plus simples car la création est gérée par le système.
-- Les utilisateurs peuvent uniquement voir et modifier LEURS PROPRES données.

-- Politique SELECT : Autorise un utilisateur à lire son propre profil.
CREATE POLICY "Les utilisateurs peuvent consulter leur propre profil."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Politique UPDATE : Autorise un utilisateur à mettre à jour son propre profil.
CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil."
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. ACTIVATION DE LA SÉCURITÉ AU NIVEAU DES LIGNES (RLS)
-- Assure que les politiques ci-dessus sont bien appliquées.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- FIN DU SCRIPT --
-- Note : Il n'y a plus de politique pour INSERT car la fonction 'handle_new_user' s'en charge.
-- Il n'y a pas de politique pour DELETE, empêchant la suppression de profils depuis l'API publique.
