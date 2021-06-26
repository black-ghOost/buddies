export default function Footer() {
    return (
        <div className="bg-dark p-3">
            <p className="text-center text-white">
                Buddies &copy; All Rights Reserved - {new Date().getFullYear()}
            </p>
        </div>
    );
}
