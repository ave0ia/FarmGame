import Plot from "../plot/Plot";
import styles from "./Tarla.module.css"

export default function Tarla({}){
    const plots = [];
    for (let i=0; i<16; i++){
        plots.push(< Plot key={i} ></Plot>)
    }
    return (
    <div className={styles.tarla}>
        {plots}
    </div>
    )
}