import apiClient from '@/utils/apiClient';
   
  export default {
    async getTeamsByLeague(leagueId) {
      try {
        // Adjust the endpoint URL to include the leagueId as a parameter
        const response = await apiClient.get(`/leagues/${leagueId}/teams`);
        console.log(leagueId)
        return response.data;
      } catch (error) {
        console.error('Error fetching teams by league:', error);
        throw error;
      }
    },
    async getAddableTeams(){
      try {
        const response = await apiClient.get(`/teams/noLeague`);
        return response.data;
      } catch (error) {
        console.error('Error fetching addable teams:', error);
        throw error;
      }
    },
    async updateTeam(teamId, teamData) {
      try {
        const response = await apiClient.put(`/teams/${teamId}`, teamData);
        return response.data; // Assuming the server responds with the updated event data
      } catch (error) {
        console.error(`Error updating team with ID ${teamId}:`, error);
        throw error; // Rethrow the error to handle it in the calling context
      }
    }, 
    async createTeam(teamData, leagueId) {
      try {
        const response = await apiClient.post(`/teams/${leagueId}`, teamData);
        console.log("Received by TeamService");
        return response.data; 
      } catch (error) {
        console.error('Failed to add team:', error);
        throw error;
      }
    },
    async deleteTeam(teamId) {
      try {
        const response = await apiClient.delete(`/teams/${teamId}`);
        console.log("Team deleted successfully");
        return response.data;
      } catch (error) {
        console.error('Failed to delete team:', error);
        throw error;
      }
    }
  };