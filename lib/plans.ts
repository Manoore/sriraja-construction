/** Coordinates in feet from the house's north-west corner: x runs east, y runs south. */
export type Door = [axis: "h" | "v", x: number, y: number, width: number, swing: 1 | -1];
export type Span = [axis: "h" | "v", x: number, y: number, length: number];
export type Room = { name: string; x?: number; y?: number; size: string; area: number; label?: string; listed?: boolean };

export type Plan = {
  tab: string;
  title: string;
  plot: [number, number];
  road: "E" | "N";
  house: [number, number, number, number];
  facts: [string, string][];
  walls: [number, number, number, number][];
  stair?: boolean;
  doors: Door[];
  opens?: Span[];
  windows: Span[];
  columns: [number, number][];
  rooms: Room[];
  total: number;
  vastu: string;
};

const northPlot: Pick<Plan, "plot" | "road" | "house"> = { plot: [30, 50], road: "N", house: [3, 5, 24, 42] };
const northColumns: [number, number][] = [[0, 0], [10, 0], [24, 0], [0, 15], [10, 14], [24, 14], [0, 27], [10, 27], [13, 27], [24, 27], [0, 42], [13, 42], [24, 42]];

export const plans: Plan[] = [
  {
    tab: "30 × 40 ft, East facing",
    title: "2-bedroom ground-floor home",
    plot: [40, 30],
    road: "E",
    house: [3, 3, 32, 24],
    facts: [["Plot", "30 × 40 ft (133 sq yd)"], ["Facing", "East road"], ["Built-up", "768 sq ft"], ["Floors", "Ground only"], ["Columns", "14, RCC frame"], ["Walls", "9 in outer, 4.5 in inner"], ["Floor height", "10 ft"], ["Build time", "6 to 8 months (sample)"]],
    walls: [[12, 0, 12, 24], [20, 0, 20, 5], [20, 14, 20, 24], [0, 12, 12, 12], [12, 5, 20, 5], [12, 17, 20, 17], [20, 14, 32, 14], [27, 0, 27, 5], [27, 5, 32, 5]],
    doors: [["v", 32, 7, 3.5, -1], ["v", 12, 7, 3, -1], ["v", 12, 13.5, 3, -1], ["v", 12, 19, 2.5, 1], ["h", 14.5, 5, 2.5, 1], ["v", 20, 14.5, 2.5, 1], ["h", 28.25, 5, 2.5, 1]],
    windows: [["h", 4, 0, 4], ["h", 15, 0, 1.5], ["h", 22, 0, 3], ["h", 29, 0, 1.5], ["h", 4, 24, 4], ["h", 15.5, 24, 1.5], ["h", 24, 24, 4], ["v", 0, 4, 4], ["v", 0, 16, 4], ["v", 32, 17, 4], ["v", 32, 11, 2]],
    columns: [[0, 0], [12, 0], [20, 0], [32, 0], [0, 12], [12, 5], [20, 5], [12, 17], [20, 14], [32, 14], [0, 24], [12, 24], [20, 24], [32, 24]],
    rooms: [
      { name: "Bedroom 2", x: 6, y: 6, size: "12 × 12", area: 144 },
      { name: "Master bedroom", x: 6, y: 18, size: "12 × 12", area: 144 },
      { name: "Toilet 1", x: 16, y: 2.5, size: "8 × 5", area: 40 },
      { name: "Dining", x: 16, y: 11, size: "8 × 12", area: 96 },
      { name: "Toilet 2, attached", label: "Toilet 2", x: 17.2, y: 20.5, size: "8 × 7", area: 56 },
      { name: "Living", x: 24, y: 9, size: "12 × 14, less pooja", area: 143 },
      { name: "Pooja", x: 29.5, y: 2.5, size: "5 × 5", area: 25 },
      { name: "Kitchen", x: 26, y: 19, size: "12 × 10", area: 120 },
    ],
    total: 768,
    vastu: "Vastu placement: east entrance, pooja in the north-east, kitchen in the south-east, master bedroom in the south-west.",
  },
  {
    tab: "30 × 50 ft, North facing, ground",
    title: "5-bedroom G+1 home, ground floor",
    ...northPlot,
    facts: [["Plot", "30 × 50 ft (167 sq yd)"], ["Facing", "North road"], ["Built-up", "1,008 sq ft ground, 1,851 sq ft total"], ["Floors", "G+1"], ["Columns", "13, RCC frame"], ["Walls", "9 in outer, 4.5 in inner"], ["Floor height", "10 ft"], ["Build time", "10 to 12 months (sample)"]],
    walls: [[10, 0, 10, 27], [0, 10, 10, 10], [0, 15, 10, 15], [0, 27, 24, 27], [10, 14, 13, 14], [21, 14, 24, 14], [19, 0, 19, 5], [19, 5, 24, 5], [6, 27, 6, 32], [0, 32, 6, 32], [13, 27, 13, 42], [13, 38, 24, 38]],
    stair: true,
    doors: [["h", 13, 0, 3.5, 1], ["v", 10, 11, 2.5, -1], ["v", 10, 16, 3, -1], ["h", 10.2, 27, 2.6, 1], ["h", 16, 27, 3, 1], ["h", 14, 38, 2.5, 1], ["v", 6, 28, 2.5, 1], ["h", 20.25, 5, 2.5, 1]],
    opens: [["v", 10, 3, 4]],
    windows: [["h", 3, 0, 4], ["h", 21, 0, 1.5], ["v", 24, 7, 4], ["v", 24, 18, 5], ["v", 24, 30, 4], ["v", 24, 39, 2], ["v", 0, 12, 1.5], ["v", 0, 19, 4], ["v", 0, 29, 1.5], ["v", 0, 36, 4], ["h", 3, 42, 5], ["h", 18, 42, 3]],
    columns: northColumns,
    rooms: [
      { name: "Stair", x: 6.5, y: 2.5, size: "10 × 10", area: 100 },
      { name: "Living", x: 16, y: 9, size: "14 × 14, less pooja", area: 171 },
      { name: "Pooja", x: 21.5, y: 2.5, size: "5 × 5", area: 25 },
      { name: "Toilet 1", x: 5, y: 12.5, size: "10 × 5", area: 50 },
      { name: "Bedroom 2", x: 5, y: 22.5, size: "10 × 12", area: 120 },
      { name: "Dining", x: 17, y: 20.5, size: "14 × 13", area: 182 },
      { name: "Kitchen", x: 18.5, y: 32.5, size: "11 × 11", area: 121 },
      { name: "Utility", x: 20, y: 40, size: "11 × 4", area: 44 },
      { name: "Toilet 2", x: 3, y: 29.5, size: "6 × 5", area: 30 },
      { name: "Master bedroom", x: 6.5, y: 37, size: "13 × 15, less toilet", area: 165 },
    ],
    total: 1008,
    vastu: "Vastu placement: north entrance, pooja in the north-east, kitchen in the south-east, master bedroom in the south-west.",
  },
  {
    tab: "30 × 50 ft, North facing, first",
    title: "5-bedroom G+1 home, first floor",
    ...northPlot,
    facts: [["Plot", "30 × 50 ft (167 sq yd)"], ["Facing", "North road"], ["Built-up", "843 sq ft first, 1,851 sq ft total"], ["Floors", "G+1"], ["Open terrace", "165 sq ft"], ["Walls", "9 in outer, 4.5 in inner"], ["Floor height", "10 ft"], ["Build time", "10 to 12 months (sample)"]],
    walls: [[10, 0, 10, 27], [0, 10, 10, 10], [0, 15, 10, 15], [0, 27, 13, 27], [10, 14, 24, 14], [13, 14, 13, 42], [13, 27, 24, 27], [6, 27, 6, 32], [0, 32, 6, 32]],
    stair: true,
    doors: [["v", 10, 11, 2.5, -1], ["h", 10.25, 14, 2.5, 1], ["v", 13, 17, 3, 1], ["v", 10, 16, 3, -1], ["h", 10.25, 27, 2.5, 1], ["v", 6, 28, 2.5, 1], ["v", 13, 34, 3, 1]],
    opens: [["v", 10, 3, 4]],
    windows: [["h", 3, 0, 4], ["h", 14, 0, 6], ["v", 24, 6, 5], ["v", 24, 18, 5], ["v", 0, 12, 1.5], ["v", 0, 19, 4], ["v", 0, 29, 1.5], ["v", 0, 36, 4], ["h", 3, 42, 5]],
    columns: northColumns,
    rooms: [
      { name: "Stair", x: 6.5, y: 2.5, size: "10 × 10", area: 100 },
      { name: "Family lounge", x: 17, y: 7, size: "14 × 14", area: 196 },
      { name: "Toilet 1", x: 5, y: 12.5, size: "10 × 5", area: 50 },
      { name: "Bedroom 3", x: 5, y: 22.5, size: "10 × 12", area: 120 },
      { name: "Passage", size: "3 × 13", area: 39 },
      { name: "Bedroom 4", x: 19, y: 22.5, size: "11 × 13", area: 143 },
      { name: "Toilet 2", x: 3, y: 29.5, size: "6 × 5", area: 30 },
      { name: "Bedroom 5", x: 6.5, y: 37, size: "13 × 15, less toilet", area: 165 },
      { name: "Open terrace", x: 19.5, y: 31, size: "", area: 0, listed: false },
    ],
    total: 843,
    vastu: "Vastu placement: lighter open space kept to the north, heavier bedroom mass to the south-west.",
  },
];
