import { useState } from 'react';
import { Calculator, Pickaxe } from 'lucide-react';

// Raw materials in Satisfactory
const RAW_MATERIALS = [
  'Iron Ore',
  'Copper Ore',
  'Limestone',
  'Coal',
  'Caterium Ore',
  'Raw Quartz',
  'Sulfur',
  'Bauxite',
  'Uranium',
  'Crude Oil',
  'Water',
  'Nitrogen Gas',
] as const;

type Material = typeof RAW_MATERIALS[number];

// Miner types with their extraction rates (items/min at 100% clock speed)
const MINERS = {
  'Miner Mk.1': { impure: 30, normal: 60, pure: 120 },
  'Miner Mk.2': { impure: 60, normal: 120, pure: 240 },
  'Miner Mk.3': { impure: 120, normal: 240, pure: 480 },
} as const;

// Fluid extractors (Oil/Water/Nitrogen)
const EXTRACTORS = {
  'Oil Extractor': { impure: 60, normal: 120, pure: 240 },
  'Water Extractor': 120, // Fixed rate
  'Resource Well Pressurizer': { impure: 60, normal: 120, pure: 240 }, // For Nitrogen
} as const;

type MinerType = keyof typeof MINERS;
type ExtractorType = keyof typeof EXTRACTORS;
type NodePurity = 'impure' | 'normal' | 'pure';

export function SatisfactoryCalculator() {
  const [material, setMaterial] = useState<Material>('Iron Ore');
  const [targetRate, setTargetRate] = useState<number>(240);
  const [nodePurity, setNodePurity] = useState<NodePurity>('normal');
  const [minerType, setMinerType] = useState<MinerType>('Miner Mk.1');
  const [clockSpeed, setClockSpeed] = useState<number>(100);

  const isFluid = material === 'Crude Oil' || material === 'Water' || material === 'Nitrogen Gas';

  const calculateProduction = () => {
    if (isFluid) {
      if (material === 'Water') {
        return (EXTRACTORS['Water Extractor'] * clockSpeed) / 100;
      } else if (material === 'Crude Oil') {
        const baseRate = EXTRACTORS['Oil Extractor'][nodePurity];
        return (baseRate * clockSpeed) / 100;
      } else if (material === 'Nitrogen Gas') {
        const baseRate = EXTRACTORS['Resource Well Pressurizer'][nodePurity];
        return (baseRate * clockSpeed) / 100;
      }
    } else {
      const baseRate = MINERS[minerType][nodePurity];
      return (baseRate * clockSpeed) / 100;
    }
    return 0;
  };

  const productionRate = calculateProduction();
  const minersNeeded = Math.ceil(targetRate / productionRate);
  const actualProduction = productionRate * minersNeeded;
  const overproduction = actualProduction - targetRate;

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-500 p-3 rounded-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl text-white">Satisfactory Calculator</h1>
            <p className="text-slate-400">Raw Materials Production Planner</p>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <div className="flex items-center gap-2">
              <Pickaxe className="w-5 h-5 text-white" />
              <h2 className="text-xl text-white">Resource Calculator</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Material Selection */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Raw Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as Material)}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {RAW_MATERIALS.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            {/* Miner/Extractor Type */}
            {!isFluid && (
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Miner Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(MINERS) as MinerType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setMinerType(type)}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        minerType === type
                          ? 'bg-orange-500 border-orange-400 text-white'
                          : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-orange-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Node Purity */}
            {material !== 'Water' && (
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Node Purity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['impure', 'normal', 'pure'] as NodePurity[]).map((purity) => (
                    <button
                      key={purity}
                      onClick={() => setNodePurity(purity)}
                      className={`px-4 py-3 rounded-lg border capitalize transition-all ${
                        nodePurity === purity
                          ? 'bg-orange-500 border-orange-400 text-white'
                          : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-orange-500'
                      }`}
                    >
                      {purity}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clock Speed */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-slate-300">Clock Speed</label>
                <span className="text-orange-400">{clockSpeed}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                value={clockSpeed}
                onChange={(e) => setClockSpeed(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1%</span>
                <span>250%</span>
              </div>
            </div>

            {/* Target Production Rate */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Target Production Rate (items/min)
              </label>
              <input
                type="number"
                value={targetRate}
                onChange={(e) => setTargetRate(Number(e.target.value))}
                min="1"
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 mt-6 p-6">
          <h3 className="text-xl text-white mb-4">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Production per {isFluid ? 'Extractor' : 'Miner'}</div>
              <div className="text-2xl text-orange-400">{productionRate.toFixed(2)}</div>
              <div className="text-xs text-slate-500">items/min</div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">{isFluid ? 'Extractors' : 'Miners'} Needed</div>
              <div className="text-2xl text-green-400">{minersNeeded}</div>
              <div className="text-xs text-slate-500">units</div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Actual Production</div>
              <div className="text-2xl text-blue-400">{actualProduction.toFixed(2)}</div>
              <div className="text-xs text-slate-500">items/min</div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Overproduction</div>
              <div className="text-2xl text-purple-400">{overproduction.toFixed(2)}</div>
              <div className="text-xs text-slate-500">items/min</div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-600">
            <p className="text-slate-300">
              You need <span className="text-orange-400 font-semibold">{minersNeeded} {isFluid ? (material === 'Water' ? 'Water Extractor(s)' : material === 'Crude Oil' ? 'Oil Extractor(s)' : 'Resource Well Pressurizer(s)') : `${minerType}(s)`}</span> on{' '}
              {material !== 'Water' && (
                <>
                  <span className="text-orange-400 font-semibold capitalize">{nodePurity}</span> node(s){' '}
                </>
              )}
              at <span className="text-orange-400 font-semibold">{clockSpeed}%</span> clock speed to produce{' '}
              <span className="text-orange-400 font-semibold">{targetRate} {material}/min</span>.
            </p>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 mt-6 p-6">
          <h3 className="text-xl text-white mb-4">Quick Reference - Base Extraction Rates</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-300">
              <thead className="border-b border-slate-600">
                <tr>
                  <th className="text-left py-2">Equipment</th>
                  <th className="text-right py-2">Impure</th>
                  <th className="text-right py-2">Normal</th>
                  <th className="text-right py-2">Pure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {(Object.entries(MINERS) as [MinerType, typeof MINERS[MinerType]][]).map(([name, rates]) => (
                  <tr key={name}>
                    <td className="py-2">{name}</td>
                    <td className="text-right text-slate-400">{rates.impure}/min</td>
                    <td className="text-right text-slate-400">{rates.normal}/min</td>
                    <td className="text-right text-slate-400">{rates.pure}/min</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2">Oil Extractor</td>
                  <td className="text-right text-slate-400">60/min</td>
                  <td className="text-right text-slate-400">120/min</td>
                  <td className="text-right text-slate-400">240/min</td>
                </tr>
                <tr>
                  <td className="py-2">Water Extractor</td>
                  <td className="text-right text-slate-400" colSpan={3}>120/min (fixed)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
