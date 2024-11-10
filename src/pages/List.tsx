import { getProductList, removeProduct } from '@/api/product';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: Array<string>;
    category: string;
    subCategory: string;
    sizes: Array<string>;
    date: number;
    bestseller?: boolean;
}
function List() {
    const [list, setList] = useState<IProduct[]>([]);
    async function fetchProductList() {
        try {
            const response = await getProductList<IProduct[]>();
            if (response.success) {
                setList(response.data!);
            }
        } catch (e) {
            console.error(e);
        }
    }
    async function handleRemoveProduct(productId: string) {
        try {
            const response = await removeProduct(productId);
            if (response.success) {
                toast.success('删除成功');
                fetchProductList();
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchProductList();
    }, []);
    return (
        <>
            <p className="mb-2">所有商品列表</p>
            <div className="flex flex-col gap-2">
                <div className="hidden grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border bg-gray-100 px-2 py-1 text-sm md:grid">
                    <b>图片</b>
                    <b>名字</b>
                    <b>类别</b>
                    <b>价格</b>
                    <b className="text-right md:text-center">操作</b>
                </div>
                {list.map(item => (
                    <div
                        className="grid grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
                        key={item.name}>
                        <img className="w-12" src={item.image[0]} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{import.meta.env.VITE_CURRENCY + item.price}</p>
                        <button
                            onClick={() => {
                                handleRemoveProduct(item._id);
                            }}
                            className="text-sm text-gray-500 duration-500 hover:text-red-600">
                            删除
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
export default List;
