import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import NavbarLoginButtons from "./components/navbar/navbar-login-buttons";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import BookCars from "./pages/BookCarsPage";
import Rent from "./pages/RentPage";
import Profile from "./pages/ProfilePage";
import Dashboard from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import Users from "./admin/users/Users"
import Cars from "./admin/cars/Cars"
import Rents from "./admin/rents/Rents"
import DashboardLogin from "./pages/DashboardLogin";

import Directors from './pages/directors/Directors'; // Adjust the path based on where your Directors component is located
import AddDirectorPage from "./pages/directors/AddDirectorPage"; // Import the new Add Director page
import EditDirectorPage from "./pages/directors/EditDirectorPage"; // Import the Edit Director page

import MoviesList from "./pages/movies/MoviesList";
import AddMoviePage from "./pages/movies/AddMoviePage";
import EditMoviePage from "./pages/movies/EditMoviePage";

import Planets from './pages/planets/Planets'; // Adjust the path based on where your Directors component is located
import AddPlanetPage from "./pages/planets/AddPlanetPage"; // Import the new Add Director page
import EditPlanetPage from "./pages/planets/EditPlanetPage"; // Import the Edit Director page

import SatellitesList from './pages/satellites/SatellitesList'; // Adjust the path based on where your Directors component is located
import AddSatellitePage from "./pages/satellites/AddSatellitePage"; // Import the new Add Director page
import EditSatellitePage from "./pages/satellites/EditSatellitePage"; // Import the Edit Director page

import Teams from './pages/teams/Teams'; // Adjust the path based on where your Directors component is located 
import AddTeamPage from "./pages/teams/AddTeamPage"; // Import the new Add Director page
import EditTeamPage from "./pages/teams/EditTeamPage"; // Import the Edit Director page

import PlayersList from "./pages/players/PlayersList";
import AddPlayerPage from "./pages/players/AddPlayerPage";
import EditPlayerPage from "./pages/players/EditPlayerPage";

import Employees from './pages/employees/Employees'; // Adjust the path based on where your Directors component is located
import AddEmployeePage from "./pages/employees/AddEmployeePage"; // Import the new Add Director page
import EditEmployeePage from "./pages/employees/EditEmployeePage"; // Import the Edit Director page

import ContractsList from "./pages/contracts/ContractsList";
import AddContractPage from "./pages/contracts/AddContractPage";
import EditContractPage from "./pages/contracts/EditContractPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar>
        <NavbarLoginButtons />
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="/cars" element={<BookCars />} />
        <Route path="/cars/:id" element={<Rent />} />
        <Route path="/profile" element={<Profile />} />


        <Route path="/directors" element={<Directors />} /> {/* New route for directors */}
        <Route path="/add-director" element={<AddDirectorPage />} /> {/* Add the new route for adding directors */}
        <Route path="/edit-director/:id" element={<EditDirectorPage />} /> {/* Add the Edit Director route */}

        <Route path="/movies" element={<MoviesList />} /> {/* Movie listing page */}
        <Route path="/add-movie" element={<AddMoviePage />} /> {/* Add Movie page */}
        <Route path="/edit-movie/:id" element={<EditMoviePage />} /> {/* Edit Movie page */}

        <Route path="/planets" element={<Planets />} /> {/* New route for directors */}
        <Route path="/add-planet" element={<AddPlanetPage />} /> {/* Add the new route for adding directors */}
        <Route path="/edit-planet/:id" element={<EditPlanetPage />} /> {/* Add the Edit Director route */}
       
        <Route path="/satellites" element={<SatellitesList />} /> {/* Movie listing page */}
        <Route path="/add-satellite" element={<AddSatellitePage />} /> {/* Add Movie page */}
        <Route path="/edit-satellite/:id" element={<EditSatellitePage />} /> {/* Edit Movie page */}

        <Route path="/teams" element={<Teams />} /> {/* New route for directors */}
        <Route path="/add-team" element={<AddTeamPage />} /> {/* Add the new route for adding directors */}
        <Route path="/edit-team/:id" element={<EditTeamPage />} /> {/* Add the Edit Director route */}

        <Route path="/players" element={<PlayersList />} /> {/* Movie listing page */}
        <Route path="/add-player" element={<AddPlayerPage />} /> {/* Add Movie page */}
        <Route path="/edit-player/:id" element={<EditPlayerPage />} /> {/* Edit Movie page */}

        <Route path="/employees" element={<Employees />} /> {/* New route for directors */}
        <Route path="/add-employee" element={<AddEmployeePage />} /> {/* Add the new route for adding directors */}
        <Route path="/edit-employee/:id" element={<EditEmployeePage />} /> {/* Add the Edit Director route */}

        <Route path="/contracts" element={<ContractsList />} /> {/* Movie listing page */}
        <Route path="/add-contract" element={<AddContractPage />} /> {/* Add Movie page */}
        <Route path="/edit-contract/:id" element={<EditContractPage />} /> {/* Edit Movie page */}


        <Route path="/admin/login" element={<DashboardLogin />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Users />} />
          <Route path="/dashboard/cars" element={<Cars />} />
          <Route path="/dashboard/rents" element={<Rents />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
