import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeams } from "../../redux/actions/actions";
import { createDriver } from "../../redux/actions/actions";
const FormPage = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);

  const [newDriver, setNewDriver] = useState({
    name: "",
    lastName: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "teams") {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );

      setNewDriver({
        ...newDriver,
        [name]: [...newDriver.teams, ...selectedOptions],
      });
    } else {
      setNewDriver({ ...newDriver, [name]: value });
    }
  };

  const handleSubmit = () => {
    dispatch(createDriver(newDriver));
    alert("Your driver has been created");
  };
  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  return (
    <div>
      <h2>Create your Driver</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={newDriver.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lastname: </label>
          <input
            type="text"
            name="lastName"
            value={newDriver.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nationality: </label>
          <input
            type="text"
            name="nationality"
            value={newDriver.nationality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={newDriver.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Day of Birth: </label>
          <input
            type="text"
            name="dob"
            value={newDriver.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name="description"
            value={newDriver.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Teams: </label>
          <select type="checkBoxe" onChange={handleChange} name="teams">
            {teams
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((team, index) => (
                <option key={index} value={team.name}>
                  {team.name}
                </option>
              ))}
          </select>
        </div>
        <p>Teams selected: {newDriver.teams.join(", ")}</p>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FormPage;
