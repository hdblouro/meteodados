class Meteo {
    Data: Date;
    Time: string;
    Temp_C: number;
    Hum: number;
    Press_Bar: number;
    TempCabine_C: number;
    Charge: number;
    SR_Wm2: number;
    WindPeak_ms: number;
    WindSpeed_Inst: number;
    WindSpeed_Avg: number;
    WindDir_Inst: number;
    WindDir_Avg: number;
    constructor(Data: Date, Time: string, Temp_C: number, Hum: number, Press_Bar: number, 
        TempCabine_C: number, Charge: number, SR_Wm2: number, WindPeak_ms: number,
        WindSpeed_Inst: number, WindSpeed_Avg: number, WindDir_Inst: number,
        WindDir_Avg: number) {
        this.Data = Data;
        this.Time = Time;
        this.Temp_C = Temp_C;
        this.Hum = Hum;
        this.Press_Bar = Press_Bar;
        this.TempCabine_C =  TempCabine_C;
        this.Charge = Charge;
        this.SR_Wm2 = SR_Wm2;
        this.WindPeak_ms = WindPeak_ms;
        this.WindSpeed_Inst = WindDir_Inst;
        this.WindSpeed_Avg = WindSpeed_Avg;
        this.WindDir_Inst = WindDir_Inst;
        this.WindDir_Avg = WindDir_Avg;
    }
}

export default Meteo;