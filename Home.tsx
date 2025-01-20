import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Download, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Soumettez vos exercices",
    description: "Téléchargez vos devoirs, exercices ou sujets d'examen en quelques clics"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Corrections détaillées",
    description: "Recevez des explications complètes et détaillées pour chaque exercice"
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Téléchargement PDF",
    description: "Exportez vos corrections au format PDF pour une utilisation hors-ligne"
  }
];

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec les couleurs du Cameroun */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full flex">
            <div className="w-1/3 bg-green-600" />
            <div className="w-1/3 bg-red-600" />
            <div className="w-1/3 bg-yellow-500" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <GraduationCap className="w-20 h-20 mx-auto text-white" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Réussir Academy
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              La première plateforme camerounaise d'intelligence artificielle éducative
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-green-600 transition-colors md:text-lg"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Une solution simple et efficace pour améliorer vos résultats scolaires
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-600"
              >
                <div className="text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full flex">
            <div className="w-1/3 bg-green-600/20" />
            <div className="w-1/3 bg-red-600/20" />
            <div className="w-1/3 bg-yellow-500/20" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Prêt à améliorer vos résultats ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Rejoignez Réussir Academy dès aujourd'hui pour seulement 2050 FCFA
            </p>
            <Link
              to="/auth"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:text-lg"
            >
              S'inscrire maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;