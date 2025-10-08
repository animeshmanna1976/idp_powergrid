// Tab switching with animation
document.getElementById('committee-tab').addEventListener('click', () => switchView('committee'));
document.getElementById('idp-tab').addEventListener('click', () => switchView('idp'));

function switchView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    if (view === 'committee') {
        document.getElementById('committee-view').classList.add('active');
        document.getElementById('committee-tab').classList.add('active');
    } else {
        document.getElementById('idp-view').classList.add('active');
        document.getElementById('idp-tab').classList.add('active');
    }
}

// Search functionality
document.getElementById('search-input').addEventListener('input', filterTable);

function filterTable() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const rows = document.querySelectorAll('#hipo-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Table sorting
document.querySelectorAll('#hipo-table th[data-sort]').forEach(header => {
    header.addEventListener('click', () => sortTable(header.dataset.sort));
});

function sortTable(column) {
    const table = document.getElementById('hipo-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Remove existing sort classes
    document.querySelectorAll('#hipo-table th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Determine sort direction
    const currentSort = table.dataset.sortColumn;
    const currentDirection = table.dataset.sortDirection || 'asc';
    const direction = (currentSort === column && currentDirection === 'asc') ? 'desc' : 'asc';
    
    // Sort rows
    rows.sort((a, b) => {
        let aVal, bVal;
        
        switch(column) {
            case 'name':
                aVal = a.cells[0].textContent.trim();
                bVal = b.cells[0].textContent.trim();
                break;
            case 'role':
                aVal = a.cells[1].textContent.trim();
                bVal = b.cells[1].textContent.trim();
                break;
            case 'placement':
                aVal = a.cells[2].textContent.trim();
                bVal = b.cells[2].textContent.trim();
                break;
            case 'status':
                aVal = a.cells[3].textContent.trim();
                bVal = b.cells[3].textContent.trim();
                break;
            case 'completion':
                aVal = parseFloat(a.cells[4].querySelector('.progress').style.width);
                bVal = parseFloat(b.cells[4].querySelector('.progress').style.width);
                break;
            case 'risk':
                aVal = parseFloat(a.cells[5].textContent.trim());
                bVal = parseFloat(b.cells[5].textContent.trim());
                break;
            default:
                return 0;
        }
        
        if (direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
    
    // Update sort indicators
    const header = document.querySelector(`#hipo-table th[data-sort="${column}"]`);
    header.classList.add(`sort-${direction}`);
    
    // Store current sort state
    table.dataset.sortColumn = column;
    table.dataset.sortDirection = direction;
}

// 9-Box Grid Hover with enhanced tooltip
document.querySelectorAll('.quadrant').forEach(quad => {
    quad.addEventListener('mouseenter', (e) => {
        const names = e.target.closest('.quadrant').dataset.names;
        if (names) {
            showTooltip(e, names);
        }
    });
    quad.addEventListener('mouseleave', () => {
        hideTooltip();
    });
});

function showTooltip(event, names) {
    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }
    const nameList = names.split(', ').map(name => `<div>${name}</div>`).join('');
    tooltip.innerHTML = `<strong>Succesors in this quadrant:</strong><br>${nameList}`;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Name Click Modal with enhanced content
document.querySelectorAll('.name-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const name = e.target.textContent;
        openModal(name);
    });
});

function openModal(name) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    // Simulate loading
    modalBody.innerHTML = '<div class="spinner"></div> Loading...';
    modal.style.display = 'block';
    
    // Simulate API call delay
    setTimeout(() => {
        modalBody.innerHTML = `
            <h2>${name}'s Readiness & IDP Dashboard</h2>
            <div class="modal-content-grid">
                <div class="readiness-gauge">
                    <h3>Personal Readiness</h3>
                    <div class="gauge-large">78%</div>
                    <p>14 months to target readiness</p>
                </div>
                <div class="radar-chart">
                    <h3>Competency Assessment</h3>
                    <canvas id="modal-radar-chart"></canvas>
                </div>
                <div class="idp-activities">
                    <h3>IDP Activities</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Activity Name</th>
                                <th>Type</th>
                                <th>Target Gap</th>
                                <th>Deadline</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Leadership Training Module</td>
                                <td><span class="pill training">Training</span></td>
                                <td>Strategic Thinking</td>
                                <td>Dec 2025</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>Job Rotation: Finance Dept</td>
                                <td><span class="pill rotation">Rotation</span></td>
                                <td>Financial Acumen</td>
                                <td>Mar 2026</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>Mentorship Program</td>
                                <td><span class="pill mentorship">Mentorship</span></td>
                                <td>Executive Presence</td>
                                <td>Jun 2026</td>
                                <td>Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mentor-card">
                    <h3>Assigned Mentor</h3>
                    <div class="mentor-info">
                        <div class="mentor-avatar"></div>
                        <div class="mentor-details">
                            <h4>Mr. K. Sharma</h4>
                            <p>Expertise: Operations, Leadership</p>
                            <p>AI Match Quality: 9.2/10</p>
                            <button class="request-btn">Request Check-in</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Render radar chart in modal
        const ctx = document.getElementById('modal-radar-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Leadership', 'Strategic Thinking', 'Communication', 'Technical Skills', 'Team Management'],
                datasets: [{
                    label: 'Current',
                    data: [7, 6, 8, 7, 6],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3B82F6',
                    borderWidth: 2
                }, {
                    label: 'Target',
                    data: [9, 9, 8, 8, 9],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: '#4F46E5',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }, 1000);
}

// Close Modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// IDP Checkbox Toggle with enhanced feedback
document.querySelectorAll('.status-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const row = e.target.closest('tr');
        if (e.target.checked) {
            row.classList.add('completed');
            showToast('Activity completed successfully!', 'success');
            // Simulate progress update
            updateProgress();
        } else {
            row.classList.remove('completed');
        }
    });
});

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Simulate progress updates
function updateProgress() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const currentWidth = parseFloat(bar.style.width);
        if (currentWidth < 100) {
            const newWidth = Math.min(currentWidth + 5, 100);
            bar.style.width = newWidth + '%';
        }
    });
}

// Export Functions with loading state
document.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const originalText = e.target.textContent;
        e.target.innerHTML = '<div class="spinner"></div> Exporting...';
        e.target.disabled = true;
        
        setTimeout(() => {
            exportToCSV();
            e.target.innerHTML = originalText;
            e.target.disabled = false;
            showToast('Data exported successfully!', 'success');
        }, 2000);
    });
});

function exportToCSV() {
    const table = document.getElementById('hipo-table');
    const rows = table.querySelectorAll('tr');
    let csv = [];
    
    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll('td, th');
        for (let j = 0; j < cols.length; j++) {
            row.push('"' + cols[j].innerText + '"');
        }
        csv.push(row.join(','));
    }
    
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leadership_dashboard_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Request Check-in button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('request-btn')) {
        showToast('Check-in request sent to mentor!', 'info');
        e.target.textContent = 'Request Sent';
        e.target.disabled = true;
    }
});

// Charts with animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate progress bars on load
    setTimeout(() => {
        document.querySelectorAll('.progress').forEach(progress => {
            const width = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = width;
            }, 500);
        });
    }, 1000);
    
    // Trend Chart
    const trendCtx = document.getElementById('trend-chart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
            datasets: [{
                label: 'Gap Closure %',
                data: [65, 70, 75, 78, 82, 85],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Radar Chart for IDP
    const radarCtx = document.getElementById('radar-chart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Leadership', 'Strategic Thinking', 'Communication', 'Technical Skills', 'Team Management'],
            datasets: [{
                label: 'Current',
                data: [7, 6, 8, 7, 6],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3B82F6',
                borderWidth: 2
            }, {
                label: 'Target',
                data: [9, 9, 8, 8, 9],
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: '#4F46E5',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
});

// Simulate real-time updates
setInterval(() => {
    // Randomly update some values
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const riskGauge = document.querySelector('.gauge');
        const currentValue = parseFloat(riskGauge.textContent);
        const newValue = (currentValue + (Math.random() - 0.5) * 0.2).toFixed(1);
        riskGauge.textContent = Math.max(0, Math.min(10, newValue));
        
        showToast('Data updated', 'info');
    }
}, 30000);