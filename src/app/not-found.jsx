import Link from "next/link";

const notFound = () => {
    return (
        <div className="w-full mx-auto">
            <h2 className="text-3xl text-red-500 text-center">Page Not Found</h2>
            <Link href='/' className="btn btn-active btn-neutral">Back to Home</Link>
        </div>
    );
};

export default notFound;