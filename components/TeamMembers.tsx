'use client';
import { useState, useEffect } from 'react';
import { teamService } from '../lib/database';
import type { TeamMember } from '../utils/adminData';

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
      const loadTeamMembers = async () => {
    try {
      const members = await teamService.getActive();
      setTeamMembers(members);
    } catch (error) {
      console.error('Error loading team members:', error);
    }
    };

    loadTeamMembers();

    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(loadTeamMembers, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (teamMembers.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Our Team
          </h2>
          <div className="text-center text-gray-600">
            <p>Team information is being loaded...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="w-32 h-32 bg-eco-pale rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {member.avatar && member.avatar.startsWith('http') ? (
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center ${member.avatar && member.avatar.startsWith('http') ? 'hidden' : ''}`}>
                  <span className="text-4xl">{member.avatar || '👨‍💼'}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-eco-green font-semibold mb-2">{member.position}</p>
              <p className="text-gray-600 mb-4">
                {member.bio}
              </p>
              
              {/* Social Links */}
              {(member.email || member.linkedin || member.twitter) && (
                <div className="flex justify-center space-x-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-eco-green hover:text-eco-dark transition-colors duration-200"
                      title="Email"
                    >
                      📧
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-eco-green hover:text-eco-dark transition-colors duration-200"
                      title="LinkedIn"
                    >
                      💼
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-eco-green hover:text-eco-dark transition-colors duration-200"
                      title="Twitter"
                    >
                      🐦
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 