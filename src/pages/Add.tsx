import { assets } from '@/assets/assets';
import { useState } from 'react';
import { addProduct } from '@/api/product';
import { toast } from 'react-toastify';
function Add() {
    const Category = [
        { value: 'Men', label: '男人' },
        { value: 'Women', label: '女人' },
        { value: 'Kids', label: '儿童' }
    ];
    const SubCategory = [
        { value: 'Topwear', label: '上衣' },
        { value: 'Bottomwear', label: '下装' },
        { value: 'Winterwear', label: '冬装' }
    ];
    const [image1, setImage1] = useState<File | null | undefined>(null);
    const [image2, setImage2] = useState<File | null | undefined>(null);
    const [image3, setImage3] = useState<File | null | undefined>(null);
    const [image4, setImage4] = useState<File | null | undefined>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(Category[0].value);
    const [subCategory, setSubCategory] = useState(SubCategory[0].value);
    const [price, setPrice] = useState('');
    const [sizes, setSizes] = useState<string[]>([]);
    const [bestseller, setBestseller] = useState(false);
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('price', price);
            formData.append('bestseller', bestseller ? 'true' : 'false');
            if (image1) {
                formData.append('image1', image1);
            }
            if (image2) {
                formData.append('image2', image2);
            }
            if (image3) {
                formData.append('image3', image3);
            }
            if (image4) {
                formData.append('image4', image4);
            }
            if (sizes.length > 0) {
                formData.append('sizes', JSON.stringify(sizes));
            }
            const response = await addProduct<null>(formData);
            console.log(response.data);
            toast.success(response.message);
            setName('');
            setDescription('');
            setPrice('');
            setSizes([]);
            setBestseller(false);
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <form className="flex w-full flex-col items-start gap-3" onSubmit={onSubmit}>
                <div>
                    <p className="mb-2">上传商品图片</p>
                    <div className="flex gap-2">
                        <label htmlFor="image1">
                            <img className="w-20 cursor-pointer" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                            <input onChange={e => setImage1(e.target!.files?.[0])} type="file" id="image1" hidden />
                        </label>
                        <label htmlFor="image2">
                            <img className="w-20 cursor-pointer" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                            <input onChange={e => setImage2(e.target!.files?.[0])} type="file" id="image2" hidden />
                        </label>
                        <label htmlFor="image3">
                            <img className="w-20 cursor-pointer" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                            <input onChange={e => setImage3(e.target!.files?.[0])} type="file" id="image3" hidden />
                        </label>
                        <label htmlFor="image4">
                            <img className="w-20 cursor-pointer" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                            <input onChange={e => setImage4(e.target!.files?.[0])} type="file" id="image4" hidden />
                        </label>
                    </div>
                </div>
                <div className="w-full">
                    <p className="mb-2">商品名称</p>
                    <input
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="w-full max-w-[500px] px-3 py-2"
                        type="text"
                        placeholder="请输入商品名称"
                        required
                    />
                </div>
                <div className="w-full">
                    <p className="mb-2">商品描述</p>
                    <textarea
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        className="w-full max-w-[500px] px-3 py-2"
                        placeholder="请输入商品描述"
                    />
                </div>
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-8">
                    <div>
                        <p className="mb-2">适合人群</p>
                        <select className="w-full px-3 py-2" onChange={e => setCategory(e.target.value)}>
                            {Category.map(item => (
                                <option value={item.value} key={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="mb-2">商品类别</p>
                        <select className="w-full px-3 py-2" onChange={e => setSubCategory(e.target.value)}>
                            {SubCategory.map(item => (
                                <option value={item.value} key={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className="mb-2">商品价格</p>
                        <input
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            className="w-full px-3 py-2 sm:w-[120px]"
                            type="number"
                            placeholder="请输入商品价格"
                        />
                    </div>
                </div>
                <div>
                    <p className="mb-2">商品的尺码</p>
                    <div className="flex gap-3">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <div
                                onClick={() => setSizes(prev => (prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]))}
                                key={size}>
                                <p className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} cursor-pointer px-3 py-1`}>{size}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-2 flex gap-2">
                    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                    <label className="cursor-pointer" htmlFor="bestseller">
                        设为精选商品
                    </label>
                </div>
                <button type="submit" className="mt-4 w-28 bg-black py-3 text-white">
                    确定添加
                </button>
            </form>
        </>
    );
}
export default Add;
