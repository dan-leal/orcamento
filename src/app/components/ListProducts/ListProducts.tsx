"use client"
import { useState, useEffect} from "react";
import ProductRow from "../ProductRow/ProductRow";  // Importe o componente ProductRow
import { Produto } from "@/app/types";

let Produtos = [
    {
        image: "https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/kam-idris-_HqHX3LBN18-unsplash.jpg",
        name: "TELHA/CH/TRAP/NAT/NAC.ESP-BME0.41MM~0 ",
        quantity: 2.5,
        pricePerUnit: 500,
    },
    {
        image: "https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/spacejoy-NpF_OYE301E-unsplash.jpg",
        name: "FORRO PVC HANNA AZUL- 8MM",
        quantity: 2,
        pricePerUnit: 750.30,
        totalPrice: 750
    },
    {
        image: "https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/michael-oxendine-GHCVUtBECuY-unsplash.jpg",
        name: "Brown Coach",
        quantity: 1,
        pricePerUnit: 3000,
        totalPrice: 9000
    }
];

interface ProdutoCarrinho extends Produto {
    quantity: number;
    totalPrice: number;
  }

export default function ListProducts() {

    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const produtosCarrinho = Produtos.map(produto => ({
            ...produto,
            quantity: 1,
            totalPrice: produto.pricePerUnit * 1
        }));
        setCarrinho(produtosCarrinho);
    }, []);

    const handleRemove = (produto: Produto) => {
        const updatedCarrinho = carrinho.filter(item => item.name !== produto.name);
        setCarrinho(updatedCarrinho);
    };

    const handleUpdateQuantity = (produto: Produto, quantity: number) => {
        const updatedCarrinho = carrinho.map(item => {
            if (item.name === produto.name) {
                item.quantity = quantity;
                item.totalPrice = quantity * item.pricePerUnit;
            }
            return item;
        });
        setCarrinho(updatedCarrinho);
    };

    const handleGenerateBudget = () => {
        const total = carrinho.reduce((acc, item) => acc + item.totalPrice, 0);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <>
            {/* Header da View de Orçamento */}
            <div className="w-full flex justify-between items-center mb-3 mt-6 pl-3">
                <div>
                    <h3 className="text-lg font-semibold text-slate-300">Orçamento de Pedido</h3>
                    <p className="text-slate-500">Não é feito reserva enquanto pedido não for faturado.</p>
                </div>
                <div className="mx-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                        <div className="relative">
                            <input
                                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                placeholder="Procure produto..."
                            />
                            <button
                                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela de produtos */}
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Produto</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Nome</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Quantidade</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Preço único</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500">Subtotal</th>
                            <th className="p-4 text-sm font-normal leading-none text-slate-500"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Linha de produtos */}
                        {carrinho.map((itemProduto, index) => (
                            <ProductRow
                                key={index}
                                itemProduto={itemProduto}
                                onRemove={handleRemove}
                                onUpdateQuantity={handleUpdateQuantity}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Botão de gerar orçamento */}

            <div className="flex justify-end mt-6 space-x-4">
                <p className="text-lg font-semibold text-slate-700">
                     R$ {carrinho.reduce((total, produto) => total + produto.totalPrice, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {showAlert && (
                    <div className="fixed bottom-4 right-4 p-4 text-white bg-green-500 rounded-md shadow-lg">
                        Orçamento gerado com sucesso!
                    </div>
                )}
                <button
                    type="button"
                    className="px-4 py-2 bg-slate-500 text-green-100/90 font-semibold rounded-md shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                    onClick={handleGenerateBudget}
                >
                    Gerar orçamento
                </button>
            </div>
        </>
    );
}
