import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveMatches from "@/components/LiveMatches";
import LeaguesSidebar from "@/components/LeaguesSidebar";
import TeamsSidebar from "@/components/TeamsSidebar";
import Footer from "@/components/Footer";
import { useEffect } from 'react';
import { useTeamsLeagues } from '@/context/TeamsLeaguesContext';
import { fetchLeagues, fetchTeams } from "@/api/teamsLeagues";
import { useEvents } from '@/context/EventsContext';

const Index = () => {
  const { theme, setTheme } = useTheme();
  const { teams, leagues, updateTeams, updateLeagues } = useTeamsLeagues();
  const { events } = useEvents();

  useEffect(() => {
    const fetchData = async () => {
      const teamsData = await fetchTeams();
      const leaguesData = await fetchLeagues();
      updateTeams(teamsData);
      updateLeagues(leaguesData);
    };

    fetchData();
  }, [updateTeams, updateLeagues]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="flex items-center justify-between px-4 py-3 max-w-[2000px] mx-auto">
          <h1 className="text-xl font-bold text-orange-500">TOTALSPORTEK</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">FOOTBALL</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">F1</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NFL</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NBA</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NHL</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">UFC</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">BOXING</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">RUGBY</a>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 max-w-[2000px] mx-auto w-full">
        <LeaguesSidebar />
        <main className="flex-1 p-4 min-h-[calc(100vh-64px)]">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Live Matches</h2>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="bg-card p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No live matches available</p>
            )}
          </section>
        </main>
        <TeamsSidebar />
      </div>

      <Footer />
    </div>
  );
};

export default Index;