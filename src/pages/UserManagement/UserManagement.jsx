import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReusableTable from '../../components/ReusableTable';
import TableToolbar from '../../components/TableToolbar';
import theme from '../../theme/theme';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Sample user data - replace with actual API call
  const sampleUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      department: 'IT',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'Active',
      department: 'HR',
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Employee',
      status: 'Inactive',
      department: 'Finance',
      joinDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Employee',
      status: 'Active',
      department: 'IT',
      joinDate: '2023-04-05'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Manager',
      status: 'Inactive',
      department: 'Finance',
      joinDate: '2023-05-12'
    }
  ];

  // Filter options for dropdown
  const statusOptions = ['All Status', 'Active', 'Inactive'];

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'role',
      label: 'Role'
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <ToggleSwitch checked={user.status === 'Active'}>
          <input
            type="checkbox"
            checked={user.status === 'Active'}
            onChange={() => handleStatusToggle(user.id)}
          />
          <span></span>
        </ToggleSwitch>
      )
    },
    {
      key: 'joinDate',
      label: 'Join Date'
    }
  ];

  useEffect(() => {
    // Initialize with sample data
    setUsers(sampleUsers);
    setFilteredUsers(sampleUsers);
  }, []);

  // Handle search and filter functionality
  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== 'All Status') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleStatusToggle = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    console.log(`User ${userId} status toggled`);
  };

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
        <Subtitle>Manage and view all users in the system</Subtitle>
      </Header>

      <TableContainer>
        <TableToolbar
          searchPlaceholder="Search users..."
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
          select1Options={statusOptions}
          select1Value={statusFilter}
          onSelect1Change={handleStatusFilterChange}
          searchPosition="right"
          showFilter={false}
        />
        
        <ReusableTable
          data={filteredUsers}
          columns={columns}
          emptyStateText="No users found"
        />
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.textColor};
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

const Subtitle = styled.p`
  color: ${theme.colors.secondaryTextColor};
  font-family: 'Inter', sans-serif;
  margin: 0;
`;

const TableContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.checked ? theme.colors.primary : '#ccc'};
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: ${props => props.checked ? '23px' : '3px'};
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }

  &:hover span {
    background-color: ${props => props.checked ? theme.colors.primary : '#bbb'};
  }
`;

export default UserManagement;