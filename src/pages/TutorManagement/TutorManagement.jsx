import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReusableTable from '../../components/ReusableTable';
import TableToolbar from '../../components/TableToolbar';
import InputComponent from '../../components/InputComponent';
import Button from '../../components/Button';
import theme from '../../theme/theme';

const TutorManagement = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    pinCode: '',
    location: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    teachingPreferences: []
  });

  // Sample tutor data - replace with actual API call
  const sampleTutors = [
    {
      id: 1,
      fullName: 'Dr. Alice Johnson',
      contactNumber: '+1-555-0123',
      emailAddress: 'alice.johnson@example.com',
      pinCode: '12345',
      location: 'New York, NY',
      status: 'Active',
      teachingPreferences: ['My Home', 'Online'],
      profileImage: {
        preview: '/src/assets/images/employee/sampleProfile.jpg',
        name: 'alice_profile.jpg'
      },
      joinDate: '2022-01-15'
    },
    {
      id: 2,
      fullName: 'Prof. Robert Smith',
      contactNumber: '+1-555-0124',
      emailAddress: 'robert.smith@example.com',
      pinCode: '67890',
      location: 'Los Angeles, CA',
      status: 'Active',
      teachingPreferences: ['Their Home', 'Institute or Coaching Center'],
      profileImage: {
        preview: '/src/assets/images/employee/sampleProfile.jpg',
        name: 'robert_profile.jpg'
      },
      joinDate: '2021-03-20'
    },
    {
      id: 3,
      fullName: 'Ms. Emily Davis',
      contactNumber: '+1-555-0125',
      emailAddress: 'emily.davis@example.com',
      pinCode: '54321',
      location: 'Chicago, IL',
      status: 'Inactive',
      teachingPreferences: ['No Preference'],
      profileImage: null,
      joinDate: '2023-06-10'
    }
  ];

  // Teaching preference options
  const teachingPreferenceOptions = [
    'My Home',
    'Their Home', 
    'No Preference',
    'Online',
    'Institute or Coaching Center'
  ];

  // Filter options for dropdown
  const statusOptions = ['All Status', 'Active', 'Inactive'];

  // Table columns configuration
  const columns = [
    {
      key: 'profileImage',
      label: 'Profile',
      render: (tutor) => (
        <ProfileImageCell>
          {tutor.profileImage ? (
            <ProfileImage src={tutor.profileImage.preview} alt={tutor.fullName} />
          ) : (
            <DefaultProfileImage>
              <img src="/src/assets/images/employee/uprofileIcon.svg" alt="Default Profile" />
            </DefaultProfileImage>
          )}
        </ProfileImageCell>
      )
    },
    {
      key: 'fullName',
      label: 'Full Name'
    },
    {
      key: 'contactNumber',
      label: 'Contact Number'
    },
    {
      key: 'emailAddress',
      label: 'Email Address'
    },
    {
      key: 'location',
      label: 'Location'
    },
    {
      key: 'teachingPreferences',
      label: 'Teaching Preferences',
      render: (tutor) => (
        <PreferencesCell>
          {tutor.teachingPreferences.slice(0, 2).join(', ')}
          {tutor.teachingPreferences.length > 2 && '...'}
        </PreferencesCell>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (tutor) => (
        <ToggleSwitch checked={tutor.status === 'Active'}>
          <input
            type="checkbox"
            checked={tutor.status === 'Active'}
            onChange={() => handleStatusToggle(tutor.id)}
          />
          <span></span>
        </ToggleSwitch>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (tutor) => (
        <ActionButtons>
          <ActionIcon onClick={() => handleView(tutor)} title="View Profile">
            <img src="/src/assets/images/employee/eye.svg" alt="View" />
          </ActionIcon>
          <ActionIcon onClick={() => handleEdit(tutor)} title="Edit">
            <img src="/src/assets/images/employee/editIcon.svg" alt="Edit" />
          </ActionIcon>
          <ActionIcon onClick={() => handleDelete(tutor.id)} title="Delete" color="#EF4444">
            <img src="/src/assets/images/shift/delete.svg" alt="Delete" />
          </ActionIcon>
        </ActionButtons>
      )
    }
  ];

  useEffect(() => {
    // Initialize with sample data
    setTutors(sampleTutors);
    setFilteredTutors(sampleTutors);
  }, []);

  // Handle search and filter functionality
  useEffect(() => {
    let filtered = tutors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tutor =>
        tutor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.teachingPreferences.some(pref => 
          pref.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter && statusFilter !== 'All Status') {
      filtered = filtered.filter(tutor => tutor.status === statusFilter);
    }

    setFilteredTutors(filtered);
  }, [searchTerm, statusFilter, tutors]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleStatusToggle = (tutorId) => {
    const updatedTutors = tutors.map(tutor => {
      if (tutor.id === tutorId) {
        return {
          ...tutor,
          status: tutor.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return tutor;
    });
    
    setTutors(updatedTutors);
    console.log(`Tutor ${tutorId} status toggled`);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (preference) => {
    setFormData(prev => ({
      ...prev,
      teachingPreferences: prev.teachingPreferences.includes(preference)
        ? prev.teachingPreferences.filter(p => p !== preference)
        : [...prev.teachingPreferences, preference]
    }));
  };

  const handleFileUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileImage: {
            file: file,
            preview: e.target.result,
            name: file.name
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      profileImage: null
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      contactNumber: '',
      emailAddress: '',
      pinCode: '',
      location: '',
      password: '',
      confirmPassword: '',
      profileImage: null,
      teachingPreferences: []
    });
  };

  const handleAddTutor = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleView = (tutor) => {
    setSelectedTutor(tutor);
    setShowViewModal(true);
  };

  const handleEdit = (tutor) => {
    setSelectedTutor(tutor);
    setFormData({
      fullName: tutor.fullName,
      contactNumber: tutor.contactNumber,
      emailAddress: tutor.emailAddress,
      pinCode: tutor.pinCode,
      location: tutor.location,
      password: '',
      confirmPassword: '',
      profileImage: tutor.profileImage,
      teachingPreferences: tutor.teachingPreferences
    });
    setShowEditModal(true);
  };

  const handleDelete = (tutorId) => {
    if (window.confirm('Are you sure you want to delete this tutor?')) {
      const updatedTutors = tutors.filter(tutor => tutor.id !== tutorId);
      setTutors(updatedTutors);
      console.log(`Tutor ${tutorId} deleted`);
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.fullName || !formData.contactNumber || !formData.emailAddress || 
        !formData.pinCode || !formData.location || formData.teachingPreferences.length === 0) {
      alert('Please fill in all required fields and select at least one teaching preference');
      return;
    }

    if (showAddModal && (!formData.password || !formData.confirmPassword)) {
      alert('Password and Confirm Password are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    if (showAddModal) {
      // Add new tutor
      const newTutor = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setTutors(prev => [...prev, newTutor]);
      setShowAddModal(false);
    } else {
      // Edit existing tutor
      const updatedTutors = tutors.map(tutor => 
        tutor.id === selectedTutor.id 
          ? { ...tutor, ...formData }
          : tutor
      );
      setTutors(updatedTutors);
      setShowEditModal(false);
    }

    resetForm();
    setSelectedTutor(null);
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    resetForm();
    setSelectedTutor(null);
  };

  return (
    <Container>
      <Header>
        <Title>Tutor Management</Title>
        <Subtitle>Manage and view all tutors in the system</Subtitle>
      </Header>

      <TableContainer>
        <TableToolbar
          searchPlaceholder="Search tutors..."
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
          select1Options={statusOptions}
          select1Value={statusFilter}
          onSelect1Change={handleStatusFilterChange}
          searchPosition="right"
          showFilter={false}
          actionText="Add Tutor"
          onActionClick={handleAddTutor}
        />
        
        <ReusableTable
          data={filteredTutors}
          columns={columns}
          emptyStateText="No tutors found"
        />
      </TableContainer>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {showAddModal ? 'Add New Tutor' : 'Edit Tutor'}
              </ModalTitle>
              <CloseButton onClick={handleCancel}>×</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <FormRow>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <InputComponent
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Contact Number *</Label>
                  <InputComponent
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    placeholder="Enter contact number"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Email Address *</Label>
                  <InputComponent
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    placeholder="Enter email address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Pin Code *</Label>
                  <InputComponent
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    placeholder="Enter pin code"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Location *</Label>
                  <InputComponent
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter location"
                  />
                </FormGroup>
                <FormGroup>
                  {/* Empty space for layout balance */}
                </FormGroup>
              </FormRow>

              {showAddModal && (
                <FormRow>
                  <FormGroup>
                    <Label>Password *</Label>
                    <InputComponent
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password *</Label>
                    <InputComponent
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm password"
                    />
                  </FormGroup>
                </FormRow>
              )}

              <FormGroup>
                <Label>Tutor Profile Image</Label>
                <FileUploadWrapper>
                  {!formData.profileImage ? (
                    <>
                      <FileUploadInput
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={(e) => handleFileUpload(e.target.files[0])}
                        id="profileImage"
                      />
                      <FileUploadLabel htmlFor="profileImage">
                        Upload Profile Image
                      </FileUploadLabel>
                    </>
                  ) : (
                    <ImagePreviewContainer>
                      <ImagePreview 
                        src={formData.profileImage.preview} 
                        alt="Profile Preview" 
                      />
                      <ImageActions>
                        <ImageFileName>{formData.profileImage.name}</ImageFileName>
                        <RemoveImageButton onClick={handleRemoveImage}>
                          <img src="/src/assets/images/employee/Cross.svg" alt="Remove" />
                        </RemoveImageButton>
                      </ImageActions>
                    </ImagePreviewContainer>
                  )}
                </FileUploadWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Teaching Preferences *</Label>
                <CheckboxGroup>
                  {teachingPreferenceOptions.map((option) => (
                    <CheckboxItem key={option}>
                      <CheckboxInput
                        type="checkbox"
                        id={option}
                        checked={formData.teachingPreferences.includes(option)}
                        onChange={() => handlePreferenceChange(option)}
                      />
                      <CheckboxLabel htmlFor={option}>
                        {option}
                      </CheckboxLabel>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                text="Cancel"
                bg={theme.colors.white}
                color={theme.colors.textColor}
                border={`1px solid ${theme.colors.border}`}
                onClick={handleCancel}
                width="120px"
              />
              <Button
                text={showAddModal ? 'Add Tutor' : 'Update Tutor'}
                bg={theme.colors.primary}
                color={theme.colors.white}
                onClick={handleSubmit}
                width="120px"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* View Profile Modal */}
      {showViewModal && selectedTutor && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Tutor Profile Overview</ModalTitle>
              <CloseButton onClick={handleCancel}>×</CloseButton>
            </ModalHeader>
            
            <ViewModalBody>
              <ProfileSection>
                <ProfileImageLarge>
                  {selectedTutor.profileImage ? (
                    <img src={selectedTutor.profileImage.preview} alt={selectedTutor.fullName} />
                  ) : (
                    <DefaultProfileImageLarge>
                      <img src="/src/assets/images/employee/uprofileIcon.svg" alt="Default Profile" />
                    </DefaultProfileImageLarge>
                  )}
                </ProfileImageLarge>
                <ProfileInfo>
                  <ProfileName>{selectedTutor.fullName}</ProfileName>
                  <ProfileStatus status={selectedTutor.status}>
                    {selectedTutor.status}
                  </ProfileStatus>
                </ProfileInfo>
              </ProfileSection>

              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>Contact Number</DetailLabel>
                  <DetailValue>{selectedTutor.contactNumber}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Email Address</DetailLabel>
                  <DetailValue>{selectedTutor.emailAddress}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Pin Code</DetailLabel>
                  <DetailValue>{selectedTutor.pinCode}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Location</DetailLabel>
                  <DetailValue>{selectedTutor.location}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Join Date</DetailLabel>
                  <DetailValue>{selectedTutor.joinDate}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Teaching Preferences</DetailLabel>
                  <DetailValue>
                    <PreferencesList>
                      {selectedTutor.teachingPreferences.map((pref, index) => (
                        <PreferenceTag key={index}>{pref}</PreferenceTag>
                      ))}
                    </PreferencesList>
                  </DetailValue>
                </DetailItem>
              </DetailsGrid>
            </ViewModalBody>

            <ModalFooter>
              <Button
                text="Close"
                bg={theme.colors.white}
                color={theme.colors.textColor}
                border={`1px solid ${theme.colors.border}`}
                onClick={handleCancel}
                width="120px"
              />
              <Button
                text="Edit Tutor"
                bg={theme.colors.primary}
                color={theme.colors.white}
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedTutor);
                }}
                width="120px"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ActionIcon = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: ${theme.colors.secondaryWhite};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.5rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.textColor};
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.textColor};
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.secondaryWhite};
    border-radius: 50%;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${theme.colors.border};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.textColor};
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.secondaryTextColor};
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${theme.colors.primary};
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${theme.colors.textColor};
  cursor: pointer;
  font-family: 'Inter', sans-serif;
`;

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FileUploadInput = styled.input`
  display: none;
`;

const FileUploadLabel = styled.label`
  display: inline-block;
  padding: 0.75rem 1rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.2s;
  font-family: 'Inter', sans-serif;
  width: fit-content;

  &:hover {
    background-color: ${theme.colors.primary}dd;
  }
`;

const FileName = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.secondaryTextColor};
  font-family: 'Inter', sans-serif;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
`;

const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid ${theme.colors.border};
`;

const ImageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

const ImageFileName = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.textColor};
  font-family: 'Inter', sans-serif;
  flex: 1;
`;

const RemoveImageButton = styled.button`
  padding: 0.25rem;
  border: none;
  background-color: #fee2e2;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: #fecaca;
  }
`;

const ProfileImageCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.border};
`;

const DefaultProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.secondaryWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.border};

  img {
    width: 20px;
    height: 20px;
    opacity: 0.6;
  }
`;

const PreferencesCell = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.textColor};
`;

const ViewModalBody = styled.div`
  padding: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const ProfileImageLarge = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${theme.colors.border};
  }
`;

const DefaultProfileImageLarge = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${theme.colors.secondaryWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${theme.colors.border};

  img {
    width: 40px;
    height: 40px;
    opacity: 0.6;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProfileName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.textColor};
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

const ProfileStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.status === 'Active' ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.status === 'Active' ? '#16a34a' : '#dc2626'};
  width: fit-content;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.secondaryTextColor};
  font-family: 'Inter', sans-serif;
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: ${theme.colors.textColor};
  font-family: 'Inter', sans-serif;
`;

const PreferencesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PreferenceTag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
`;

export default TutorManagement;