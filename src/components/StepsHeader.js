import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

function StepsHeader({ children }) {
    return (
        <Breadcrumb className=' fs-5 m-1 poppins-text'>
            <Breadcrumb.Item className="text-reset text-decoration-none">
                <Link to="/cart" className="text-reset text-decoration-none"> Cart </Link>
            </Breadcrumb.Item>

            {children}

        </Breadcrumb>
    );
}

export default StepsHeader;