import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModel from '../pages/shop/CartModel'
import { logout } from '../redux/features/auth/authSlice'
import avatarImage from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'; 

const Navbar = () => {
    const products = useSelector((state) => state.cart.products)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    const [logoutUser] = useLogoutUserMutation()

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error("Failed to log out", error)
        }
    }

    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen)
    }

    const adminDropDownMenus = [
        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Manage Items", path: "/dashboard/manage-products" },
        { label: "All Orders", path: "/dashboard/manage-orders" },
        { label: "Add new Post", path: "/dashboard/add-new-post" },
    ]

    const userDropDownMenus = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Profile", path: "/dashboard/profile" },
        { label: "Payments", path: "/dashboard/payments" },
        { label: "Orders", path: "/dashboard/orders" },
    ]

    // Dynamically choose menu based on email
    const dropdownMenus = user?.role === "admin" ? adminDropDownMenus : userDropDownMenus

    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl px-4 flex justify-between items-center mx-auto'>
                {/* Left Menu */}
                <ul className='nav__links'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/shop">Shop</Link></li>
                    <li className='link'><Link to="/">Pages</Link></li>
                    <li className='link'><Link to="/">Contact</Link></li>
                </ul>

                {/* Logo */}
                <div className='nav__logo'>
                    <Link to="/">Labeba <span>.</span></Link>
                </div>

                {/* Right Icons */}
                <div className='nav__icons relative flex items-center gap-4'>
                    <Link to="/search"><i className="ri-search-line text-xl"></i></Link>

                    <button onClick={handleCartToggle} className='relative'>
                        <i className="ri-shopping-bag-line text-xl"></i>
                        <sup className='text-sm px-1.5 text-white rounded-full bg-primary absolute -top-2 -right-2'>{products.length}</sup>
                    </button>

                    {user ? (
                        <>
                            <img
                                onClick={handleDropDownToggle}
                                src={user?.profileImage || avatarImage}
                                alt="Profile"
                                className='size-6 rounded-full cursor-pointer'
                            />
                            {
                                isDropDownOpen && (
                                    <div className='absolute right-0 top-10 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                        <ul className='font-medium space-y-4 p-2'>
                                            {dropdownMenus.map((menu, index) => (
                                                <li key={index}>
                                                    <Link onClick={() => setIsDropDownOpen(false)} className='dropdown-items' to={menu.path}>{menu.label}</Link>
                                                </li>
                                            ))}
                                            <li><button onClick={handleLogout} className='text-left w-full text-red-500'>Logout</button></li>
                                        </ul>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <Link to="/login"><i className="ri-user-line text-xl"></i></Link>
                    )}
                </div>
            </nav>

            {isCartOpen && (
                <CartModel products={products} isOpen={isCartOpen} onclose={handleCartToggle} />
            )}
        </header>
    )
}

export default Navbar
