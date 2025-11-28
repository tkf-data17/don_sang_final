import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, FileText, TrendingUp } from 'lucide-react';

// Monthly data for the year
const monthlyData = [
  { month: 'Jan', donations: 487, appointments: 542, donors: 412 },
  { month: 'Fév', donations: 523, appointments: 589, donors: 445 },
  { month: 'Mar', donations: 612, appointments: 678, donors: 521 },
  { month: 'Avr', donations: 548, appointments: 601, donors: 467 },
  { month: 'Mai', donations: 589, appointments: 632, donors: 498 },
  { month: 'Juin', donations: 634, appointments: 698, donors: 543 },
  { month: 'Juil', donations: 678, appointments: 745, donors: 578 },
  { month: 'Août', donations: 612, appointments: 667, donors: 521 },
  { month: 'Sep', donations: 698, appointments: 756, donors: 589 },
  { month: 'Oct', donations: 745, appointments: 812, donors: 634 },
  { month: 'Nov', donations: 723, appointments: 789, donors: 612 },
  { month: 'Déc', donations: 0, appointments: 0, donors: 0 }
];

// Blood type performance
const bloodTypePerformance = [
  { type: 'O+', collected: 234, distributed: 221, efficiency: 94 },
  { type: 'A+', collected: 187, distributed: 179, efficiency: 96 },
  { type: 'B+', collected: 145, distributed: 138, efficiency: 95 },
  { type: 'O-', collected: 34, distributed: 34, efficiency: 100 },
  { type: 'A-', collected: 28, distributed: 27, efficiency: 96 },
  { type: 'AB+', collected: 42, distributed: 39, efficiency: 93 },
  { type: 'B-', collected: 19, distributed: 18, efficiency: 95 },
  { type: 'AB-', collected: 11, distributed: 11, efficiency: 100 }
];

// Regional performance
const regionalData = [
  { region: 'Maritime', donors: 5847, donations: 3421, centers: 8 },
  { region: 'Plateaux', donors: 2134, donations: 1256, centers: 5 },
  { region: 'Centrale', donors: 1567, donations: 892, centers: 4 },
  { region: 'Kara', donors: 1234, donations: 734, centers: 3 },
  { region: 'Savanes', donors: 1065, donations: 623, centers: 2 }
];

export function Reports() {
  const [reportType, setReportType] = useState<'monthly' | 'bloodtype' | 'regional'>('monthly');
  const [selectedPeriod, setSelectedPeriod] = useState('2025');

  const totalDonations = monthlyData.reduce((sum, m) => sum + m.donations, 0);
  const avgDonationsPerMonth = Math.round(totalDonations / 11);
  const totalAppointments = monthlyData.reduce((sum, m) => sum + m.appointments, 0);
  const conversionRate = Math.round((totalDonations / totalAppointments) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Rapports et analyses</h2>
          <p className="text-sm text-gray-600 mt-1">Vue d'ensemble des performances</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <Download className="w-5 h-5" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-red-600" />
            <p className="text-sm text-gray-600">Total dons (2025)</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalDonations.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">+15% vs 2024</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-gray-600">Moyenne mensuelle</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{avgDonationsPerMonth}</p>
          <p className="text-sm text-blue-600 mt-1">dons/mois</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-600">Taux de conversion</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{conversionRate}%</p>
          <p className="text-sm text-green-600 mt-1">RDV → Dons</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-600">Efficacité stock</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">95%</p>
          <p className="text-sm text-purple-600 mt-1">Sang utilisé</p>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setReportType('monthly')}
            className={`px-4 py-2 rounded-lg transition ${
              reportType === 'monthly'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Évolution mensuelle
          </button>
          <button
            onClick={() => setReportType('bloodtype')}
            className={`px-4 py-2 rounded-lg transition ${
              reportType === 'bloodtype'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Par groupe sanguin
          </button>
          <button
            onClick={() => setReportType('regional')}
            className={`px-4 py-2 rounded-lg transition ${
              reportType === 'regional'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Par région
          </button>
        </div>
      </div>

      {/* Monthly Report */}
      {reportType === 'monthly' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Évolution des dons et rendez-vous</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="donations" stroke="#ef4444" strokeWidth={2} name="Dons effectués" />
                <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={2} name="Rendez-vous" />
                <Line type="monotone" dataKey="donors" stroke="#10b981" strokeWidth={2} name="Donneurs actifs" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Tableau détaillé mensuel</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Mois</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Dons</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">RDV</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Donneurs</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.filter(m => m.donations > 0).map((month) => (
                    <tr key={month.month} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{month.month}</td>
                      <td className="text-right py-3 px-4 text-gray-900">{month.donations}</td>
                      <td className="text-right py-3 px-4 text-gray-900">{month.appointments}</td>
                      <td className="text-right py-3 px-4 text-gray-900">{month.donors}</td>
                      <td className="text-right py-3 px-4">
                        <span className="text-green-600">
                          {Math.round((month.donations / month.appointments) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Blood Type Report */}
      {reportType === 'bloodtype' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Performance par groupe sanguin</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={bloodTypePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="collected" fill="#3b82f6" name="Collecté" />
                <Bar dataKey="distributed" fill="#10b981" name="Distribué" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Efficacité par groupe</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bloodTypePerformance.map((item) => (
                <div key={item.type} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold">
                      {item.type}
                    </span>
                    <span className={`text-lg font-bold ${
                      item.efficiency >= 95 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {item.efficiency}%
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Collecté:</span>
                      <span className="text-gray-900 font-semibold">{item.collected}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distribué:</span>
                      <span className="text-gray-900 font-semibold">{item.distributed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Perdu:</span>
                      <span className="text-red-600 font-semibold">
                        {item.collected - item.distributed}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regional Report */}
      {reportType === 'regional' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 mb-4">Performance régionale</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="donors" fill="#3b82f6" name="Donneurs" />
                <Bar dataKey="donations" fill="#ef4444" name="Dons" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regionalData.map((region) => {
              const donationRate = Math.round((region.donations / region.donors) * 100);
              const donationsPerCenter = Math.round(region.donations / region.centers);
              
              return (
                <div key={region.region} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h4 className="text-gray-900 mb-4">{region.region}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Donneurs inscrits</p>
                      <p className="text-2xl font-bold text-blue-600">{region.donors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Dons effectués</p>
                      <p className="text-2xl font-bold text-red-600">{region.donations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Centres actifs</p>
                      <p className="text-2xl font-bold text-green-600">{region.centers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Taux de don</p>
                      <p className="text-2xl font-bold text-purple-600">{donationRate}%</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dons par centre:</span>
                      <span className="text-gray-900 font-semibold">{donationsPerCenter}/mois</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
