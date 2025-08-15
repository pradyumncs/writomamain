
import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-700 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="md:flex md:items-start md:justify-between">
                    <div className="mb-10 md:mb-0 md:w-1/3">
                        <div className="flex items-center">
                            <Image src="/logo.png" alt="Writoma Logo" width={40} height={40} />
                            <span className="ml-2 text-2xl font-bold">Writoma</span>
                        </div>
                        <p className="mt-4 text-gray-300">
                            The most advanced and consistent AI humanizer on the market.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:w-2/3">
                       

                        <div>
                            <h3 className="text-lg font-semibold">Help</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link href="/support" className="hover:underline">Support</Link></li>
                                <li><Link href="/helpcenter" className="hover:underline">Help Center</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">Legal</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link href="/termsconditions" className="hover:underline">Terms of Use</Link></li>
                                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                                <li><Link href="/refunds" className="hover:underline">Refund Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-10 border-gray-600" />

                <div className="flex items-center justify-between">
                    <p className="text-gray-400">Copyright © 2025 Writoma, LLC. All rights reserved.</p>
                  
                </div>
            </div>
        </footer>
    );
};

export default Footer;

