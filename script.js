// Mock data for events
const mockEvents = [
    {
        id: "1",
        title: "Annual Hackathon 2024",
        date: "28 hours - 20 AM",
        time: "1:50M 18M",
        venue: "Tech Lab",
        category: "Technical",
        image: "attached_assets/generated_images/College_hackathon_event_photo_387a863c.png",
        isRegistered: false,
        organizer: "Computer Science Department",
        description: "Join us for the most exciting hackathon of the year! Build innovative solutions, work with cutting-edge technology, and compete for amazing prizes. This 24-hour coding marathon will challenge your skills and creativity.",
        participants: 45,
        maxParticipants: 100
    },
    {
        id: "2",
        title: "Spring Fest - Battle of the Bands",
        date: "21 hours - 10 AM",
        time: "4:55M AM",
        venue: "Main Auditorium",
        category: "Cultural",
        image: "attached_assets/generated_images/Cultural_night_performance_photo_3a03e64d.png",
        isRegistered: false,
        organizer: "Cultural Committee",
        description: "Show off your musical talents in our epic Battle of the Bands competition! Whether you're a solo artist or part of a band, this is your chance to perform on stage and win amazing prizes.",
        participants: 23,
        maxParticipants: 50
    },
    {
        id: "3",
        title: "Annual Sports Meet 2024",
        date: "13 hours - 8 AM",
        time: "6:00AM",
        venue: "Sports Complex",
        category: "Sports",
        image: "attached_assets/generated_images/College_sports_festival_photo_c2f894fc.png",
        isRegistered: false,
        organizer: "Sports Department",
        description: "Participate in our annual sports meet featuring multiple athletic disciplines. From track and field to team sports, show your athletic prowess and compete for the championship.",
        participants: 156,
        maxParticipants: 300
    },
    {
        id: "4",
        title: "Robotics Workshop 2024",
        date: "28 hours - 10 AM",
        time: "4:30M 18M",
        venue: "Tech Center",
        category: "Workshop",
        image: "attached_assets/generated_images/Robotics_workshop_event_photo_277f9578.png",
        isRegistered: false,
        organizer: "IEEE Student Chapter",
        description: "Learn hands-on robotics engineering in this comprehensive workshop. Build, program, and control robots while learning from industry experts.",
        participants: 67,
        maxParticipants: 80
    },
    {
        id: "5",
        title: "Cultural Night Performance",
        date: "15 hours - 10 AM",
        time: "6:00M AM",
        venue: "Cultural Hall",
        category: "Cultural",
        image: "attached_assets/generated_images/Cultural_night_performance_photo_3a03e64d.png",
        isRegistered: false,
        organizer: "Arts and Culture Society",
        description: "Experience an evening of diverse cultural performances including dance, music, and drama. Celebrate the rich cultural heritage of our diverse student community.",
        participants: 89,
        maxParticipants: 150
    }
];

// Global state
let currentUser = null;
let currentUserType = 'student';
let registeredEvents = [];
let currentEventId = '1';

// Mock admin data
const mockAdminEvents = [
    {
        id: "1",
        title: "Annual Hackathon 2024",
        category: "Technical",
        date: "2024-03-15",
        time: "09:00",
        venue: "Tech Lab",
        registrations: 45,
        capacity: 100,
        status: "Upcoming",
        organizer: "Computer Science Dept",
        description: "Join us for the annual hackathon competition"
    },
    {
        id: "2",
        title: "Spring Fest - Battle of the Bands",
        category: "Cultural",
        date: "2024-03-20",
        time: "18:00",
        venue: "Main Auditorium",
        registrations: 23,
        capacity: 200,
        status: "Upcoming",
        organizer: "Cultural Committee",
        description: "Musical competition for all students"
    },
    {
        id: "3",
        title: "Annual Sports Meet 2024",
        category: "Sports",
        date: "2024-02-28",
        time: "08:00",
        venue: "Sports Complex",
        registrations: 156,
        capacity: 300,
        status: "Completed",
        organizer: "Sports Department",
        description: "Inter-college sports competition"
    },
    {
        id: "4",
        title: "Robotics Workshop 2024",
        category: "Workshop",
        date: "2024-03-10",
        time: "14:00",
        venue: "Tech Center",
        registrations: 67,
        capacity: 80,
        status: "Ongoing",
        organizer: "IEEE Student Chapter",
        description: "Hands-on robotics workshop"
    }
];

// Page management
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        updateDemoNavigation(pageId);
        
        // Initialize page-specific content
        if (pageId === 'student-dashboard') {
            loadUpcomingEvents();
        } else if (pageId === 'browse-events') {
            loadAllEvents();
            setupFilters();
        } else if (pageId === 'admin-dashboard') {
            loadRecentEvents();
            loadAdminStats();
        } else if (pageId === 'manage-events') {
            loadEventsTable();
        } else if (pageId === 'event-details') {
            loadEventDetails();
        }
    }
}

function updateDemoNavigation(activePageId) {
    document.querySelectorAll('.demo-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the corresponding button
    const pageMap = {
        'login-page': 0,
        'signup-page': 1,
        'student-dashboard': 2,
        'browse-events': 3,
        'event-details': 4,
        'admin-dashboard': 5,
        'manage-events': 6,
        'add-event': 7
    };
    
    const buttonIndex = pageMap[activePageId];
    if (buttonIndex !== undefined) {
        const buttons = document.querySelectorAll('.demo-nav-btn');
        if (buttons[buttonIndex]) {
            buttons[buttonIndex].classList.add('active');
        }
    }
}

// Event card creation
function createEventCard(event, userType = 'student') {
    const categoryClass = `badge-${event.category.toLowerCase()}`;
    const participantInfo = userType === 'admin' && event.participants ? 
        `<div class="event-card-info-item event-card-participant-count">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="m22 21-3-3 3-3"></path>
            </svg>
            <span>${event.participants}/${event.maxParticipants || 100} registered</span>
        </div>` : '';
    
    return `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-card-image" style="background-image: url('${event.image}')">
                <span class="badge ${categoryClass}">${event.category}</span>
            </div>
            <div class="event-card-content">
                <h3 class="event-card-title">${event.title}</h3>
                <div class="event-card-info">
                    <div class="event-card-info-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-card-info-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-card-info-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${event.venue}</span>
                    </div>
                    ${participantInfo}
                </div>
            </div>
            <div class="event-card-footer">
                <button class="btn btn-outline btn-sm" onclick="viewEventDetails('${event.id}')">View Details</button>
                ${userType === 'student' ? `
                    <button class="btn ${event.isRegistered ? 'btn-success' : 'btn-primary'} btn-sm" 
                            onclick="toggleEventRegistration('${event.id}')">
                        ${event.isRegistered ? 'Registered' : 'Register'}
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

// Load upcoming events for dashboard
function loadUpcomingEvents() {
    const container = document.getElementById('upcoming-events');
    if (container) {
        const upcomingEvents = mockEvents.slice(0, 3);
        container.innerHTML = upcomingEvents.map(event => createEventCard(event, 'student')).join('');
    }
}

// Load all events for browse page
function loadAllEvents() {
    const container = document.getElementById('all-events');
    if (container) {
        container.innerHTML = mockEvents.map(event => createEventCard(event, 'student')).join('');
    }
}

// Event registration toggle
function toggleEventRegistration(eventId) {
    // Handle current event on details page
    if (eventId === 'current') {
        eventId = currentEventId;
    }
    
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
        event.isRegistered = !event.isRegistered;
        
        if (event.isRegistered) {
            registeredEvents.push(eventId);
            console.log(`Registered for event: ${event.title}`);
        } else {
            registeredEvents = registeredEvents.filter(id => id !== eventId);
            console.log(`Unregistered from event: ${event.title}`);
        }
        
        // Update event details page if showing
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id === 'event-details') {
            loadEventDetails();
        }
        
        // Reload the events to update UI
        loadUpcomingEvents();
        loadAllEvents();
    }
}

// View event details
function viewEventDetails(eventId) {
    console.log(`Viewing details for event: ${eventId}`);
    currentEventId = eventId;
    showPage('event-details');
}

// Load event details
function loadEventDetails() {
    const event = mockEvents.find(e => e.id === currentEventId) || mockEvents[0];
    
    document.getElementById('event-details-title').textContent = event.title;
    document.getElementById('event-details-organizer').textContent = `Organized by ${event.organizer || 'College Committee'}`;
    document.getElementById('event-details-img').src = event.image;
    document.getElementById('event-details-badge').className = `badge ${getBadgeClass(event.category)}`;
    document.getElementById('event-details-badge').textContent = event.category;
    document.getElementById('event-details-datetime').textContent = `${event.date}, ${event.time}`;
    document.getElementById('event-details-venue').textContent = event.venue;
    document.getElementById('event-details-description').textContent = event.description || 'Join us for this exciting event! This is a great opportunity to participate and learn new skills while connecting with fellow students.';
    
    // Update registration button
    const registerBtn = document.getElementById('register-event-btn');
    const isRegistered = event.isRegistered;
    registerBtn.textContent = isRegistered ? 'REGISTERED' : 'REGISTER NOW';
    registerBtn.className = `btn btn-full ${isRegistered ? 'btn-success' : 'btn-primary'}`;
}

// Setup filters for browse events
function setupFilters() {
    const searchInput = document.getElementById('search-events');
    const categoryFilters = document.querySelectorAll('input[type="checkbox"]');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterEvents);
    }
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterEvents);
    });
}

// Filter events based on search and categories
function filterEvents() {
    const searchTerm = document.getElementById('search-events')?.value.toLowerCase() || '';
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    const filteredEvents = mockEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                            event.venue.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.includes(event.category);
        
        return matchesSearch && matchesCategory;
    });
    
    const container = document.getElementById('all-events');
    if (container) {
        if (filteredEvents.length === 0) {
            container.innerHTML = '<div class="no-events">No events found matching your criteria.</div>';
        } else {
            container.innerHTML = filteredEvents.map(event => createEventCard(event, 'student')).join('');
        }
    }
}

// Form handlers
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    console.log('Login attempted:', { username, password });
    
    // Mock logic - admin users have "admin" in their username
    currentUserType = username.toLowerCase().includes('admin') ? 'admin' : 'student';
    currentUser = username;
    
    // Navigate to appropriate dashboard
    if (currentUserType === 'admin') {
        showPage('admin-dashboard');
    } else {
        showPage('student-dashboard');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const formData = {
        fullName: document.getElementById('signup-fullname').value,
        username: document.getElementById('signup-username').value,
        studentId: document.getElementById('signup-studentid').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        confirmPassword: document.getElementById('signup-confirm-password').value
    };
    
    console.log('Signup attempted:', formData);
    
    // Mock validation
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    alert('Registration successful! Please login.');
    showPage('login-page');
}

// Logout function
function logout() {
    currentUser = null;
    currentUserType = 'student';
    registeredEvents = [];
    showPage('login-page');
}

// User menu dropdown
function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

// Admin Functions
function loadRecentEvents() {
    const container = document.getElementById('recent-events');
    if (container) {
        const recentEvents = mockAdminEvents.slice(0, 3);
        container.innerHTML = recentEvents.map(event => `
            <div class="recent-event-item">
                <div class="recent-event-info">
                    <div class="recent-event-title">${event.title}</div>
                    <div class="recent-event-meta">${event.date} • ${event.registrations} registrations</div>
                </div>
                <span class="badge ${getBadgeClass(event.category)}">${event.category}</span>
            </div>
        `).join('');
    }
}

function loadEventsTable() {
    const tbody = document.getElementById('events-table-body');
    if (tbody) {
        tbody.innerHTML = mockAdminEvents.map(event => `
            <tr>
                <td>${event.title}</td>
                <td><span class="badge ${getBadgeClass(event.category)}">${event.category}</span></td>
                <td>${formatDate(event.date)}</td>
                <td>${event.venue}</td>
                <td>${event.registrations}/${event.capacity}</td>
                <td><span class="status-badge ${getStatusClass(event.status)}">${event.status}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="table-btn table-btn-edit" onclick="editEvent('${event.id}')">Edit</button>
                        <button class="table-btn table-btn-delete" onclick="deleteEvent('${event.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function getBadgeClass(category) {
    const classMap = {
        'Technical': 'badge-technical',
        'Cultural': 'badge-cultural',
        'Sports': 'badge-sports',
        'Workshop': 'badge-workshop',
        'Seminar': 'badge-workshop',
        'Academic': 'badge-technical'
    };
    return classMap[category] || 'badge-technical';
}

function getStatusClass(status) {
    const classMap = {
        'Upcoming': 'status-upcoming',
        'Ongoing': 'status-ongoing',
        'Completed': 'status-completed'
    };
    return classMap[status] || 'status-upcoming';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function editEvent(eventId) {
    console.log(`Editing event: ${eventId}`);
    alert(`Edit event functionality would be implemented here for event ID: ${eventId}`);
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
        console.log(`Deleting event: ${eventId}`);
        // Remove from mock data
        const index = mockAdminEvents.findIndex(e => e.id === eventId);
        if (index > -1) {
            mockAdminEvents.splice(index, 1);
            loadEventsTable();
        }
        alert('Event deleted successfully!');
    }
}

function refreshEventsList() {
    loadEventsTable();
    alert('Events list refreshed!');
}

function handleAddEvent(event) {
    event.preventDefault();
    
    const formData = {
        title: document.getElementById('event-title').value,
        category: document.getElementById('event-category').value,
        description: document.getElementById('event-description').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        venue: document.getElementById('event-venue').value,
        capacity: document.getElementById('event-capacity').value || 100,
        registrationDeadline: document.getElementById('registration-deadline').value,
        fee: document.getElementById('event-fee').value || 0,
        organizer: document.getElementById('event-organizer').value,
        contactInfo: document.getElementById('contact-info').value
    };
    
    console.log('Creating new event:', formData);
    
    // Add to mock data
    const newEvent = {
        id: String(Date.now()),
        title: formData.title,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        registrations: 0,
        capacity: parseInt(formData.capacity),
        status: 'Upcoming',
        organizer: formData.organizer,
        description: formData.description
    };
    
    mockAdminEvents.unshift(newEvent);
    
    // Also add to student events
    mockEvents.unshift({
        id: newEvent.id,
        title: newEvent.title,
        date: formatDate(newEvent.date),
        time: newEvent.time,
        venue: newEvent.venue,
        category: newEvent.category,
        image: "attached_assets/generated_images/College_hackathon_event_photo_387a863c.png",
        isRegistered: false
    });
    
    alert('Event created successfully!');
    
    // Reset form
    document.getElementById('add-event-form').reset();
    
    // Navigate to manage events
    showPage('manage-events');
}

// Rich text editor functionality
function formatText(command) {
    document.execCommand(command, false, null);
    const editor = document.getElementById('event-description');
    if (editor) {
        editor.focus();
    }
}

// Enhanced form submission with category checkboxes
function handleAddEventSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('event-title').value;
    const editor = document.getElementById('event-description');
    const description = editor ? (editor.innerText || editor.textContent) : '';
    
    // Get selected categories
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]:checked');
    const categories = Array.from(categoryCheckboxes).map(cb => cb.value);
    
    if (categories.length === 0) {
        alert('Please select at least one category');
        return;
    }
    
    console.log('Creating event:', { title, description, categories });
    
    // Add to mock data (use first category for display)
    const newEvent = {
        id: String(Date.now()),
        title,
        date: document.getElementById('event-date')?.value || "TBD",
        time: document.getElementById('event-time')?.value || "TBD",
        venue: document.getElementById('event-venue')?.value || "TBD",
        category: categories[0],
        image: "attached_assets/generated_images/College_hackathon_event_photo_387a863c.png", // Default image
        isRegistered: false,
        organizer: "Event Committee",
        description: description || "A new exciting event for students.",
        participants: 0,
        maxParticipants: 100
    };
    
    mockEvents.push(newEvent);
    
    alert('Event created successfully!');
    showPage('manage-events');
}

// Add participant viewing modal functionality
function viewParticipants(eventId) {
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
        // Create and show modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Participants - ${event.title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-content">
                    <p><strong>Total Registrations:</strong> ${event.participants || 0}/${event.maxParticipants || 100}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((event.participants || 0) / (event.maxParticipants || 100)) * 100}%"></div>
                    </div>
                    <div class="participants-list">
                        <p>Participant list would be displayed here in a real application.</p>
                        <p>Mock participants: John Doe, Jane Smith, Alex Johnson...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Enhanced manage events table functionality
function loadEventsTable() {
    const tbody = document.getElementById('events-table-body');
    if (!tbody) return;

    tbody.innerHTML = mockEvents.map(event => `
        <tr>
            <td class="event-name">
                <div class="event-title">${event.title}</div>
                <div class="event-organizer">${event.organizer || 'Event Committee'}</div>
            </td>
            <td>
                <span class="badge ${getBadgeClass(event.category)}">${event.category}</span>
            </td>
            <td>${event.date}</td>
            <td>${event.venue}</td>
            <td>
                <button class="btn btn-link" onclick="viewParticipants('${event.id}')">
                    ${event.participants || 0}/${event.maxParticipants || 100}
                </button>
            </td>
            <td>
                <span class="badge badge-success">Active</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-outline btn-sm" onclick="viewEventDetails('${event.id}')">View</button>
                    <button class="btn btn-outline btn-sm" onclick="editEvent('${event.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEvent('${event.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function editEvent(eventId) {
    console.log('Editing event:', eventId);
    alert('Edit functionality would open a form pre-populated with event data.');
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        const index = mockEvents.findIndex(e => e.id === eventId);
        if (index > -1) {
            mockEvents.splice(index, 1);
            loadEventsTable();
        }
    }
}

// Pagination functionality
function changePage(page) {
    console.log(`Changing to page ${page}`);
    
    // Update pagination dots
    document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === page - 1);
    });
    
    // In a real app, this would load different events based on page
    loadEventsTable();
}

// Badge class helper
function getBadgeClass(category) {
    const classMap = {
        'Technical': 'badge-technical',
        'Cultural': 'badge-cultural', 
        'Sports': 'badge-sports',
        'Workshop': 'badge-workshop',
        'Academic': 'badge-academic',
        'Seminar': 'badge-technical'
    };
    return classMap[category] || 'badge-technical';
}

// Enhanced admin dashboard with more stats
function loadAdminStats() {
    const totalEvents = mockEvents.length;
    const totalRegistrations = mockEvents.reduce((sum, event) => sum + (event.participants || 0), 0);
    const avgParticipants = totalEvents > 0 ? Math.round(totalRegistrations / totalEvents) : 0;
    const upcomingEvents = mockEvents.filter(event => !event.completed).length;
    
    // Update stats if elements exist
    const statsElements = {
        'total-events': totalEvents,
        'active-users': 245, // Mock data
        'registrations': totalRegistrations,
        'upcoming': upcomingEvents
    };
    
    Object.entries(statsElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Setup form handlers
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const addEventForm = document.getElementById('add-event-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    if (addEventForm) {
        addEventForm.addEventListener('submit', handleAddEventSubmit);
    }
    
    // Setup image upload
    const imageInput = document.getElementById('event-image-input');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('Image selected:', file.name);
                const uploadArea = document.querySelector('.image-upload-area h4');
                if (uploadArea) {
                    uploadArea.textContent = `Selected: ${file.name}`;
                }
            }
        });
    }
    
    // Setup user menu
    const userMenuButton = document.getElementById('user-menu-button');
    if (userMenuButton) {
        userMenuButton.addEventListener('click', toggleUserMenu);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const userMenu = document.querySelector('.user-menu');
        const dropdown = document.getElementById('user-dropdown');
        
        if (userMenu && dropdown && !userMenu.contains(event.target)) {
            dropdown.style.display = 'none';
        }
        
        // Close modals when clicking outside
        if (event.target.classList.contains('modal-overlay')) {
            event.target.remove();
        }
    });
    
    // Initialize with login page
    showPage('login-page');
    
    console.log('SRMCEM Event Management System initialized');
});