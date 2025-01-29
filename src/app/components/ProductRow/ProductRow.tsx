"use client";
import Image from 'next/image';
import { Produto } from '../../types';

interface ItemCarrinhoProps {
    itemProduto: Produto & { quantity: number, totalPrice: number };
    onRemove: (produto: Produto) => void;
    onUpdateQuantity: (produto: Produto, quantity: number) => void;
}

export default function ProductRow({ itemProduto, onRemove, onUpdateQuantity }: ItemCarrinhoProps) {

    return (
        <>
            <tr className="hover:bg-slate-200">
                <td className="p-4 border-b border-slate-200 py-5">
                    <Image src={itemProduto.image} alt={itemProduto.name} className="w-16 h-16 object-cover rounded" width={64} height={64} />
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                    <p className="block font-semibold text-sm text-slate-800">{itemProduto.name}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                    <input
                        type="number"
                        value={itemProduto.quantity}
                        onChange={(e) => onUpdateQuantity(itemProduto, parseFloat(e.target.value))}
                        className="w-16 text-sm text-slate-500 border rounded p-1"
                    />
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                    <p id={`${itemProduto.name}.quantity`} className="text-sm text-slate-500">R$ {itemProduto.pricePerUnit}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                    <p id={`${itemProduto.name}.value`} className="text-sm text-slate-500">{(itemProduto.pricePerUnit * itemProduto.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                    <button type="button" className="text-slate-500 hover:text-slate-700" onClick={() => onRemove(itemProduto)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    );
};
