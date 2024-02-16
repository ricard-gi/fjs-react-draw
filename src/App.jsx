import C2048 from './C2048'
import Stars from './Stars'
import Meteo from './Meteo'
import Barres from './Barres'
import Pie from './Pie'
import Relotge from './Relotge'
import Crono from './Crono'

export default () => {



    return (
        <>
            <div className="grid grid-cols-4 gap-8 grid-row">
                <div className="w-full h-100">
                    <Meteo />

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
        </>
    )
}
