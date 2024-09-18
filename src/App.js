import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Card from './Components/Card';
import TodoImg from "./images/To-do.svg";
import InProgressImg from "./images/in-progress.svg";
import BacklogImg from "./images/Backlog.svg";
import HighPriorityImg from "./images/Img - High Priority.svg";
import LowPriorityImg from "./images/Img - Low Priority.svg";
import MediumPriorityImg from "./images/Img - Medium Priority.svg";
import NoPriorityImg from "./images/No-priority.svg";
import UrgentPriorityImg from "./images/SVG - Urgent Priority colour.svg";
import AddIcon from "./images/add.svg";
import ThreeDotMenu from "./images/3 dot menu.svg";
import './App.css';

function App() {
  const [ticketsData, setTicketsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [groupByCategory, setGroupByCategory] = useState('status');
  const [sortOrder, setSortOrder] = useState('priority');

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTicketsData(data.tickets);
        setUsersData(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTicketsData();
  }, []);

  const groupBy = (key, data) => {
    return data.reduce((acc, item) => {
      const groupValue = item[key];
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      acc[groupValue].push(item);
      return acc;
    }, {});
  };

  const sortTickets = (tickets, sortKey) => {
    return [...tickets].sort((a, b) => {
      if (sortKey === 'priority') {
        return b.priority - a.priority;
      } else if (sortKey === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const getGroupedTickets = () => {
    let groupedData;
    if (groupByCategory === 'user') {
      groupedData = groupBy('userId', ticketsData);
    } else if (groupByCategory === 'status') {
      groupedData = groupBy('status', ticketsData);
    } else if (groupByCategory === 'priority') {
      groupedData = groupBy('priority', ticketsData);
    }

    Object.keys(groupedData).forEach((group) => {
      groupedData[group] = sortTickets(groupedData[group], sortOrder);
    });

    return groupedData;
  };

  const groupedTickets = getGroupedTickets();

  return (
    <div className="App">
      <Navbar setGrouping={setGroupByCategory} setOrdering={setSortOrder} />
      <div className="k-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="k-column">
            <h2>
              {group.substring(0, 3) !== "usr" ? group : ' '}
              {group === 'Todo' && (
                <img
                  src={TodoImg}
                  alt="Todo"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === 'Backlog' && (
                <img
                  src={BacklogImg}
                  alt="Backlog"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === 'In progress' && (
                <img
                  src={InProgressImg}
                  alt="In Progress"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === '0' && (
                <img
                  src={NoPriorityImg}
                  alt="No Priority"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === '1' && (
                <img
                  src={LowPriorityImg}
                  alt="Low Priority"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === '2' && (
                <img
                  src={MediumPriorityImg}
                  alt="Medium Priority"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === '3' && (
                <img
                  src={HighPriorityImg}
                  alt="High Priority"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group === '4' && (
                <img
                  src={UrgentPriorityImg}
                  alt="Urgent Priority"
                  style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }}
                />
              )}
              {group.substring(0, 3) !== 'usr' && (
                <>
                  <img
                    src={AddIcon}
                    alt="Add Icon"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <img
                    src={ThreeDotMenu}
                    alt="Three Dot Menu"
                    style={{ width: '20px', height: '20px' }}
                  />
                </>
              )}
            </h2>

            {group.substring(0, 3) === 'usr' && (
              <>
                <h2>
                  {usersData.find(user => user.id === groupedTickets[group][0]?.userId)?.name}
                  <img
                    src={AddIcon}
                    alt="Add Icon"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <img
                    src={ThreeDotMenu}
                    alt="Three Dot Menu"
                    style={{ width: '20px', height: '20px' }}
                  />
                </h2>
              </>
            )}

            {groupedTickets[group].map(ticket => (
              <Card key={ticket.id} ticket={ticket} user={usersData.find(user => user.id === ticket.userId)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
