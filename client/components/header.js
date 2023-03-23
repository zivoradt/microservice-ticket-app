import Link from 'next/link';

export default ({currentUser}) => {

    return (<nav className="navbar navbar-light bg-light p-3">
        <Link href="/" passHref>
            Tickets
        </Link>
        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
                {currentUser? 'Sign out' : 'Sign in/up'}
            </ul>
        </div>
    </nav>)
};