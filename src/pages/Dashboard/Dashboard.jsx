import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chart from '../../components/Dashboard/Chart';
import InputComponent from '../../components/InputComponent';
import Button from '../../components/Button';
import theme from '../../theme/theme';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({
    fromDate: '',
    toDate: ''
  });
  const [filteredData, setFilteredData] = useState(null);

  // Sample analytics data
  const analyticsData = {
    totalUsers: 1250,
    activeUsers: 1050,
    inactiveUsers: 200,
    totalTutors: 85,
    activeTutors: 72,
    inactiveTutors: 13,
    totalSessions: 3420,
    growth: {
      users: 12.5,
      tutors: 8.3,
      sessions: 15.7
    },
    chartData: {
      userRegistrations: [
        { month: 'Jan', users: 120, tutors: 8 },
        { month: 'Feb', users: 150, tutors: 12 },
        { month: 'Mar', users: 180, tutors: 15 },
        { month: 'Apr', users: 200, tutors: 18 },
        { month: 'May', users: 220, tutors: 20 },
        { month: 'Jun', users: 250, tutors: 22 }
      ],
      sessionStats: [
        { day: 'Mon', sessions: 45 },
        { day: 'Tue', sessions: 52 },
        { day: 'Wed', sessions: 48 },
        { day: 'Thu', sessions: 61 },
        { day: 'Fri', sessions: 55 },
        { day: 'Sat', sessions: 38 },
        { day: 'Sun', sessions: 42 }
      ],
      userStatusData: [
        { name: 'Active Users', value: 1050, color: '#10B981' },
        { name: 'Inactive Users', value: 200, color: '#EF4444' }
      ],
      tutorStatusData: [
        { name: 'Active Tutors', value: 72, color: '#10B981' },
        { name: 'Inactive Tutors', value: 13, color: '#EF4444' }
      ]
    }
  };

  useEffect(() => {
    // Initialize with current data
    setFilteredData(analyticsData);
  }, []);

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    if (!dateRange.fromDate || !dateRange.toDate) {
      alert('Please select both from and to dates');
      return;
    }
    
    // Simulate filtering data based on date range
    console.log('Filtering data from', dateRange.fromDate, 'to', dateRange.toDate);
    // In real implementation, you would filter the actual data here
    setFilteredData(analyticsData);
  };

  const handleReset = () => {
    setDateRange({
      fromDate: '',
      toDate: ''
    });
    setFilteredData(analyticsData);
  };

  if (!filteredData) return <div>Loading...</div>;

  return (
    <Container>
      <Header>
        <Title>Dashboard Analytics</Title>
        <Subtitle>Overview of platform performance and statistics</Subtitle>
      </Header>

      {/* Date Filter Section */}
      <FilterSection>
        <FilterTitle>Date Range Filter</FilterTitle>
        <FilterControls>
          <DateInputGroup>
            <Label>From Date</Label>
            <InputComponent
              type="date"
              value={dateRange.fromDate}
              onChange={(e) => handleDateChange('fromDate', e.target.value)}
            />
          </DateInputGroup>
          <DateInputGroup>
            <Label>To Date</Label>
            <InputComponent
              type="date"
              value={dateRange.toDate}
              onChange={(e) => handleDateChange('toDate', e.target.value)}
            />
          </DateInputGroup>
          <ButtonGroup>
            <Button
              text="Filter"
              bg={theme.colors.primary}
              color={theme.colors.white}
              onClick={handleFilter}
              width="100px"
            />
            <Button
              text="Reset"
              bg={theme.colors.white}
              color={theme.colors.textColor}
              border={`1px solid ${theme.colors.border}`}
              onClick={handleReset}
              width="100px"
            />
          </ButtonGroup>
        </FilterControls>
      </FilterSection>

      {/* Stats Cards */}
      <StatsGrid>
        <StatsCard>
          <StatsIcon>
            <img src="/src/assets/images/Dashboard Images/group_svgrepo.com.svg" alt="Users" />
          </StatsIcon>
          <StatsContent>
            <StatsNumber>{filteredData.totalUsers.toLocaleString()}</StatsNumber>
            <StatsLabel>Total Users</StatsLabel>
            <StatsBreakdown>
              <BreakdownItem>
                <BreakdownDot color="#10B981" />
                <BreakdownText>Active: {filteredData.activeUsers}</BreakdownText>
              </BreakdownItem>
              <BreakdownItem>
                <BreakdownDot color="#EF4444" />
                <BreakdownText>Inactive: {filteredData.inactiveUsers}</BreakdownText>
              </BreakdownItem>
            </StatsBreakdown>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon>
            <img src="/src/assets/images/Dashboard Images/group_svgrepo.com.svg" alt="Tutors" />
          </StatsIcon>
          <StatsContent>
            <StatsNumber>{filteredData.totalTutors}</StatsNumber>
            <StatsLabel>Total Tutors</StatsLabel>
            <StatsBreakdown>
              <BreakdownItem>
                <BreakdownDot color="#10B981" />
                <BreakdownText>Active: {filteredData.activeTutors}</BreakdownText>
              </BreakdownItem>
              <BreakdownItem>
                <BreakdownDot color="#EF4444" />
                <BreakdownText>Inactive: {filteredData.inactiveTutors}</BreakdownText>
              </BreakdownItem>
            </StatsBreakdown>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon>
            <img src="/src/assets/images/Dashboard Images/calendar_svgrepo.com.svg" alt="Sessions" />
          </StatsIcon>
          <StatsContent>
            <StatsNumber>{filteredData.totalSessions.toLocaleString()}</StatsNumber>
            <StatsLabel>Total Sessions</StatsLabel>
            <StatsGrowth positive={filteredData.growth.sessions > 0}>
              +{filteredData.growth.sessions}% from last month
            </StatsGrowth>
          </StatsContent>
        </StatsCard>
      </StatsGrid>

      {/* Charts Section */}
      <ChartsGrid>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>User & Tutor Registrations</ChartTitle>
            <ChartSubtitle>Monthly registration trends</ChartSubtitle>
          </ChartHeader>
          <ChartContainer>
            <Chart 
              data={filteredData.chartData.userRegistrations}
              type="line"
              xKey="month"
              yKeys={['users', 'tutors']}
              colors={[theme.colors.primary, '#10B981']}
            />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>Weekly Sessions</ChartTitle>
            <ChartSubtitle>Daily session activity</ChartSubtitle>
          </ChartHeader>
          <ChartContainer>
            <Chart 
              data={filteredData.chartData.sessionStats}
              type="bar"
              xKey="day"
              yKeys={['sessions']}
              colors={['#8B5CF6']}
            />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>User Status Distribution</ChartTitle>
            <ChartSubtitle>Active vs Inactive users</ChartSubtitle>
          </ChartHeader>
          <ChartContainer>
            <Chart 
              data={filteredData.chartData.userStatusData}
              type="bar"
              xKey="name"
              yKeys={['value']}
              colors={['#10B981', '#EF4444']}
            />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>Tutor Status Distribution</ChartTitle>
            <ChartSubtitle>Active vs Inactive tutors</ChartSubtitle>
          </ChartHeader>
          <ChartContainer>
            <Chart 
              data={filteredData.chartData.tutorStatusData}
              type="bar"
              xKey="name"
              yKeys={['value']}
              colors={['#10B981', '#EF4444']}
            />
          </ChartContainer>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.textColor};
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

const Subtitle = styled.p`
  color: ${theme.colors.secondaryTextColor};
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 1rem;
`;

const FilterSection = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const FilterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.textColor};
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
`;

const FilterControls = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  flex-wrap: wrap;
`;

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.textColor};
  font-family: 'Inter', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatsCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  }
`;

const StatsIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 0.75rem;
  background-color: ${theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 30px;
    height: 30px;
    filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.textColor};
  font-family: 'Inter', sans-serif;
  line-height: 1;
`;

const StatsLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.secondaryTextColor};
  font-family: 'Inter', sans-serif;
  margin: 0.25rem 0;
`;

const StatsGrowth = styled.div`
  font-size: 0.75rem;
  color: ${props => props.positive ? '#10B981' : '#EF4444'};
  font-weight: 500;
  font-family: 'Inter', sans-serif;
`;

const StatsBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const BreakdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreakdownDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const BreakdownText = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.secondaryTextColor};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const ChartHeader = styled.div`
  margin-bottom: 1rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.textColor};
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
`;

const ChartSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.secondaryTextColor};
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

export default Dashboard;