import Navbar from "@/components/shared/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-3xl font-bold mb-4 pt-4 ">Welcome to JobPortal</h1>
            <p className="text-muted-foreground">
                Find your dream job, apply in minutes, and manage your applications easily.
            </p>

        </div>
    );
};

export default Home;
