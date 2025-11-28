-- Ces politiques de sécurité sont nécessaires pour permettre aux utilisateurs
-- de gérer leurs propres données dans la table 'profiles' de manière sécurisée.

-- 1. Activer la Row-Level Security (RLS) sur la table 'profiles'.
-- Si elle est déjà activée, cette commande n'aura aucun effet.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- On supprime les anciennes politiques pour éviter les conflits
DROP POLICY IF EXISTS "Les utilisateurs peuvent créer leur propre profil." ON public.profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir leur propre profil." ON public.profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent mettre à jour leur propre profil." ON public.profiles;

-- 2. POLITIQUE D'INSERTION : Autoriser les utilisateurs authentifiés à créer leur propre profil.
-- La clause "TO authenticated" est cruciale ici.
CREATE POLICY "Les utilisateurs peuvent créer leur propre profil."
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK ( auth.uid() = id );

-- 3. POLITIQUE DE SÉLECTION : Autoriser les utilisateurs authentifiés à consulter leur propre profil.
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil."
ON public.profiles
FOR SELECT
TO authenticated
USING ( auth.uid() = id );

-- 4. POLITIQUE DE MISE À JOUR : Autoriser les utilisateurs authentifiés à mettre à jour leur propre profil.
CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil."
ON public.profiles
FOR UPDATE
TO authenticated
USING ( auth.uid() = id );

-- NOTE : L'ajout de "DROP POLICY" permet de ré-exécuter ce script sans erreur.