import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, AlertCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  number: string;
  owner: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'orange',
    name: 'Orange Money',
    number: '658508638',
    owner: 'Patrick Ngono'
  },
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    number: '654046210',
    owner: 'Fabrice Seke'
  }
];

function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const validateTransactionId = (id: string) => {
    // Format: PP250116.2359.B69653
    const regex = /^[A-Z]{2}\d{6}\.\d{4}\.[A-Z]\d{5}$/;
    return regex.test(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTransactionId(transactionId)) {
      setError('Format d\'ID de transaction invalide. Exemple: PP250116.2359.B69653');
      return;
    }

    // TODO: Implement payment verification
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Paiement
          </h2>
          <p className="mt-2 text-gray-600">
            Montant à payer : 2050 FCFA
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!selectedMethod ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Choisissez votre méthode de paiement
              </h3>
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-green-500 hover:bg-green-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.owner}</p>
                    </div>
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Instructions de paiement {selectedMethod.name}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p className="text-sm text-gray-600">
                    1. Composez le #150*1*1*658508638*2050# (Orange) ou *126*1*1*654046210*2050# (MTN)
                  </p>
                  <p className="text-sm text-gray-600">
                    2. Sélectionnez "Envoyer de l'argent"
                  </p>
                  <p className="text-sm text-gray-600">
                    3. Entrez le numéro : <span className="font-medium">{selectedMethod.number}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    4. Entrez le montant : <span className="font-medium">2050 FCFA</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    5. Validez avec votre code secret
                  </p>
                  <p className="text-sm text-gray-600">
                    6. Notez l'ID de transaction reçu par SMS
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded bg-red-50 text-red-600 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                  ID de transaction
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="transactionId"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                    placeholder="PP250116.2359.B6965"
                    className="block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedMethod(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Valider
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;