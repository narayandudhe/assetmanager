
import {Link} from 'react-router-dom';



function Header() {
  return (
    <header>
        <Link to='/' className='logo'>Assets Manager</Link>
        <input type="checkbox" id="menu-bar"/>
        <label htmlFor='menu-bar'>Menu</label>
        <nav className='navbar'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/AddAsset'>Add Assets</Link></li>
                <li><Link to='/AddEmployee'>Add Employee</Link></li>
                <li><Link to='/AssignAsset'>Assign Assets</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
