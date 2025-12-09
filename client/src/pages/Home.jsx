import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaFilter, FaBell, FaQuoteLeft, FaBriefcase, FaUserTie } from 'react-icons/fa';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className='relative pt-20 pb-32 overflow-hidden'>
                <div className='absolute inset-0 bg-blue-50/50 -skew-y-3 origin-top-left transform translate-y-24'></div>
                <div className='max-w-7xl mx-auto px-6 relative'>
                    <div className='grid lg:grid-cols-2 gap-16 items-center'>
                        <div className='text-center lg:text-left'>
                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100'>
                                <span className='w-2 h-2 rounded-full bg-blue-600 animate-pulse'></span>
                                #1 Platform for Internships
                            </div>
                            <h1 className='text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900'>
                                Find Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'>Dream Job</span> <br /> Without The Hassle.
                            </h1>
                            <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                                Connect with top companies, track your applications, and launch your career.
                                We verify every job posting so you can apply with confidence.
                            </p>
                            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
                                <Link to='/jobs-listing' className='w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl transform hover:-translate-y-1'>
                                    Find Jobs Now
                                </Link>
                            </div>
                        </div>
                        <div className='hidden lg:block relative'>
                            <div className='relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500'>
                                <div className='flex items-center justify-between mb-8'>
                                    <div>
                                        <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Total Applications</div>
                                        <div className='text-3xl font-bold text-gray-900'>24,562</div>
                                    </div>
                                    <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl'>
                                        <FaBriefcase />
                                    </div>
                                </div>
                                <div className='space-y-4'>
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className='flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer'>
                                            <div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500'>
                                                <FaUserTie />
                                            </div>
                                            <div className='flex-1'>
                                                <div className='h-2.5 w-24 bg-gray-200 rounded mb-2'></div>
                                                <div className='h-2 w-16 bg-gray-100 rounded'></div>
                                            </div>
                                            <div className='px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full'>
                                                Active
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-8 pt-6 border-t border-gray-100 flex items-center justify-center'>
                                    <span className='text-sm font-medium text-blue-600 cursor-pointer hover:underline'>View all analytics</span>
                                </div>
                            </div>
                            {/* Decorative blobs */}
                            <div className='absolute -top-12 -right-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -z-10'></div>
                            <div className='absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -z-10'></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='py-20 bg-white'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='grid md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center'>
                        {[
                            { label: 'Active Jobs', value: '2.5k+' },
                            { label: 'Companies', value: '500+' },
                            { label: 'Hired Candidates', value: '12k+' },
                            { label: 'New Daily', value: '150+' },
                        ].map((stat, i) => (
                            <div key={i} className='py-4'>
                                <div className='text-4xl font-bold text-gray-900 mb-2'>{stat.value}</div>
                                <div className='text-sm font-medium text-gray-500 uppercase tracking-wide'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id='features' className='py-24 bg-gray-50'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='text-center max-w-3xl mx-auto mb-20'>
                        <h2 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6'>Everything You Need to Get Hired</h2>
                        <p className='text-lg text-gray-600'>We've streamlined the entire recruiting process so you can focus on showing off your skills.</p>
                    </div>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {[
                            { icon: FaShieldAlt, title: 'Verified Jobs', desc: 'No more spam or fake listings. We manually verify every single company and job post.' },
                            { icon: FaFilter, title: 'Advanced Filtering', desc: 'Drill down by tech stack, stipend, duration, and location to find your perfect fit.' },
                            { icon: FaBell, title: 'Instant Alerts', desc: 'Get notified via email or dashboard the moment a relevant job is posted.' },
                        ].map((item, i) => (
                            <div key={i} className='bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                                <div className='w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-8'>
                                    <item.icon />
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>{item.title}</h3>
                                <p className='text-gray-600 leading-relaxed'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id='testimonials' className='py-24 bg-white'>
                <div className='max-w-7xl mx-auto px-6'>
                    <div className='flex flex-col md:flex-row items-end justify-between mb-12 gap-6'>
                        <div className='max-w-xl'>
                            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>Loved by Students & Recruiters</h2>
                            <p className='text-lg text-gray-600'>Don't just take our word for it. Here is what people are saying about their Jobify experience.</p>
                        </div>
                        <div className='flex gap-2 text-blue-600 font-semibold cursor-pointer hover:underline'>
                            See all reviews &rarr;
                        </div>
                    </div>
                    <div className='grid md:grid-cols-3 gap-8'>
                        {[
                            { text: 'I applied to 5 jobs and got 3 interviews in a week. The UI is so clean!', user: 'Sarah J.', role: 'Frontend Dev' },
                            { text: 'Finally a platform that feels modern. No clutter, just good jobs.', user: 'Mike T.', role: 'Product Designer' },
                            { text: 'Features like application tracking are a game changer for keeping organized.', user: 'Emily R.', role: 'Marketing Intern' },
                        ].map((t, i) => (
                            <div key={i} className='p-8 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 transition-colors'>
                                <FaQuoteLeft className='text-blue-300 text-2xl mb-6' />
                                <p className='text-lg text-gray-800 italic mb-6'>"{t.text}"</p>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                                    <div>
                                        <div className='font-bold text-gray-900'>{t.user}</div>
                                        <div className='text-sm text-gray-500'>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className='py-20'>
                <div className='max-w-5xl mx-auto px-6'>
                    <div className='bg-blue-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden'>
                        <div className='relative z-10'>
                            <h2 className='text-3xl md:text-5xl font-bold text-white mb-8'>Ready to Kickstart Your Career?</h2>
                            <p className='text-blue-100 text-xl mb-10 max-w-2xl mx-auto'>Join over 10,000 students calling Jobify their home for internship hunting.</p>
                            <Link to='/user-registration' className='inline-block px-10 py-5 bg-white text-blue-700 font-bold text-lg rounded-xl shadow-2xl hover:bg-gray-50 transition-colors transform hover:-translate-y-1'>
                                Create Free Account
                            </Link>
                        </div>
                        {/* Decorative circles */}
                        <div className='absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2'></div>
                        <div className='absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3'></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
