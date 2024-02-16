import C2048 from './C2048'
import Stars from './Stars'
import Meteo from './Meteo'
import Barres from './Barres'
import Pie from './Pie'
import Relotge from './Relotge'
import Crono from './Crono'
import Map from './Map'
import Gauges from './Gauges'

export default () => {



    return (
        <>
            <div className="grid grid-cols-2 gap-8 ">
                <div className="w-full h-100">
                    <Gauges />

                </div>
                <div className="w-full h-100">
                    <Barres />

                </div>
                <div className="w-full h-100">
                    <Pie />

                </div>
                <div className="w-full h-100">
                    <Relotge />
                    <Crono />
                </div>
            </div>

            <br />
            <br />


            <div className="w-1/2 m-auto">
              
                <Map />
            </div>
            <br />
            <br />
            <br />
            <br />

        </>
    )
}
