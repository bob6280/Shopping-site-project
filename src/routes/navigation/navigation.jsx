import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utilities/firebase/firebase.utils";
import CartIcon from "../../Components/cart-icon/cart-icon.component";
import CartDropDown from "../../Components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation= ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className="logo"></CrownLogo>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop' >Shop
                    </NavLink>
                    { 
                        currentUser?(
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                            ):(
                             <Link className="nav-link" to='/auth' >SignIn
                            </Link>
                            )
                    }
                    <CartIcon></CartIcon>
                </NavLinks>
                {isCartOpen && <CartDropDown></CartDropDown>}
            </NavigationContainer>
            <Outlet></Outlet>
        </Fragment>
    );
}

export default Navigation; 