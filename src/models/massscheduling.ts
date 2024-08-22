export class MassScheduling{
    private massScheduling: string[] = Array(7).fill("");

    constructor(massScheduling: any){
        for(var i = 0; i < massScheduling.length; i++){
            this.massScheduling[i] = massScheduling[i].time;
        };
    }

    getMassScheduling(){
        return this.massScheduling;
    }
}