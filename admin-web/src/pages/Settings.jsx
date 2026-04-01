import Topbar from '../components/Topbar';

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#03040a]">
      <Topbar title="Settings" />
      
      <main className="ml-72 p-10">
        <div className="max-w-4xl space-y-10">
          <div className="glass p-12 rounded-[48px] border border-white/5 bg-[#161925]/30">
            <h2 className="text-2xl font-black text-white mb-8">System Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                <div>
                  <h4 className="font-bold text-white">Maintenance Mode</h4>
                  <p className="text-sm text-gray-500 font-medium">Prevent clients from submitting new projects</p>
                </div>
                <div className="w-14 h-8 bg-gray-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all" />
                </div>
              </div>
              <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 transition-all hover:border-indigo-500/30">
                <div>
                  <h4 className="font-bold text-white">AI Analysis Engine</h4>
                  <p className="text-sm text-gray-500 font-medium">Configure project stack generation sensitivity</p>
                </div>
                <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">V2.4 Stable</span>
              </div>
            </div>
          </div>

          <div className="glass p-12 rounded-[48px] border border-white/5 bg-[#161925]/30">
            <h2 className="text-2xl font-black text-white mb-8">Security Configuration</h2>
            <div className="grid grid-cols-2 gap-8">
              <button className="p-8 rounded-[32px] bg-white/5 border border-white/10 text-left hover:border-indigo-500/30 transition-all group">
                <h4 className="font-bold text-white mb-2">Update Credentials</h4>
                <p className="text-sm text-gray-500 font-medium">Change admin login password & email</p>
              </button>
              <button className="p-8 rounded-[32px] bg-white/5 border border-white/10 text-left hover:border-red-500/30 transition-all group">
                <h4 className="font-bold text-red-400 mb-2">Platform Logs</h4>
                <p className="text-sm text-gray-500 font-medium">Review system access and errors</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
