'use client'

import React, { useState } from 'react';

export default function TokenPage({ params }: { params: { id: string } }) {

    const [activeTab, setActiveTab] = useState('buy'); // Estado para controlar la pestaña activa

    return (
        <div className='flex flex-col space-y-6'>
            {/* Info */}
            <div>
                <h1 className="text-2xl font-bold text-black">Token Info</h1>
                <p className="text-black">Token Address: {params.id}</p>
            </div>

            {/* Content */}
            <div className="flex flex-row h-full min-h-[400px] w-full">
                <div className="bg-black flex-1 flex flex-col justify-center items-center">
                    Chart
                </div>

                <div className="bg-white flex-1 rounded-md shadow-md px-4 transition-all">
                    {/* Tabs para Comprar y Vender */}
                    <div className="flex border-b">
                        <button
                            className={`flex-1 p-4 ${activeTab === 'buy' ? 'text-black font-bold' : 'text-grey'}`}
                            onClick={() => setActiveTab('buy')}
                        >
                            Buy
                        </button>
                        <button
                            className={`flex-1 p-4 ${activeTab === 'sell' ? 'text-black font-bold' : 'text-grey'}`}
                            onClick={() => setActiveTab('sell')}
                        >
                            Sell
                        </button>
                    </div>

                    {/* Contenido de las Tabs */}
                    <div className="pt-4">
                        {activeTab === 'buy' ? (
                            <div>
                                {/* Contenido de Comprar */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col border-2 border-primary rounded-md p-5">
                                        <div className="flex items-center justify-between text-sm text-grey">
                                            <div>Amount to buy</div>
                                            <div className="text-[10px]">Balance: <span className="font-medium text-black">0 CHICKEN</span></div>
                                        </div>
                                        <div className="mt-2.5 flex items-center">
                                            <input className="flex-grow h-10 border-b-2 border-grey text-lg font-bold text-black bg-transparent" placeholder="0" type="text" />
                                        </div>
                                        {/* Botón para realizar la compra */}
                                        <button className="mt-4 px-6 py-2 bg-black text-white rounded-md border-2 border-rose-600">
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Contenido de Vender */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col border-2 border-primary rounded-md p-5">
                                        <div className="flex items-center justify-between text-sm text-grey">
                                            <div>Amount to sell</div>
                                            <div className="text-[10px]">Balance: <span className="font-medium text-black">X CHICKEN</span></div>
                                        </div>
                                        <div className="mt-2.5 flex items-center">
                                            <input className="flex-grow h-10 border-b-2 border-grey text-lg font-bold text-black bg-transparent" placeholder="0" type="text" />
                                        </div>
                                        {/* Botón para realizar la venta */}
                                        <button className="mt-4 px-6 py-2 bg-black text-white rounded-md border-2 border-rose-600">
                                            Sell
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}
