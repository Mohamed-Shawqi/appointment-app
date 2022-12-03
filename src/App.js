import { useState, useEffect, useCallback } from "react";
import { SlCalender } from "react-icons/sl";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  let filteredArray = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setAppointmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <SlCalender className="inline-block text-red-500 align-top" /> Your
        Appointments
      </h1>
      <Search
        query={query}
        onQueryChange={(myQuery) => {
          setQuery(myQuery);
        }}
        sortBy={sortBy}
        orderBy={orderBy}
        onHandleSort={(mySort) => setSortBy(mySort)}
        onHandleOrder={(myOrder) => setOrderBy(myOrder)}
      />
      <AddAppointment
        onSendAppointment={(myApt) =>
          setAppointmentList([...appointmentList, myApt])
        }
        lastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <ul>
        {filteredArray.map((list) => (
          <AppointmentInfo
            key={list.id}
            list={list}
            onDeleteAppointment={(itemID) => {
              setAppointmentList(
                appointmentList.filter(
                  (appointmentItem) => appointmentItem.id !== itemID
                )
              );
            }}
            onQueryChange={(e) => {}}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
