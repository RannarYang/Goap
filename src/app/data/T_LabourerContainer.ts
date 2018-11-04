/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-11-03 18:37:14 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-03 19:03:22
 */
class T_LabourerContainer {
	private _labourerMap: Map<number, T_LabourerBean> = new Map<number, T_LabourerBean>();
    public get labourerMap(): Map<number, T_LabourerBean> {
        return this._labourerMap;
    }
    constructor(){
		this._labourerMap.set(LabourerType.Blacksmith, new T_LabourerBean(LabourerType.Blacksmith, 1, ToolType.Axe))
		this._labourerMap.set(LabourerType.Logger, new T_LabourerBean(LabourerType.Logger, 2, ToolType.Axe))
		this._labourerMap.set(LabourerType.Miner, new T_LabourerBean(LabourerType.Miner, 1, ToolType.Pick))
		this._labourerMap.set(LabourerType.WoodCutter, new T_LabourerBean(LabourerType.WoodCutter, 2, ToolType.Axe))
    }
    public getLabourerByType(type: number): T_LabourerBean {
        if(this._labourerMap.has(type)) {
            return this._labourerMap.get(type);
        } else {
            console.warn("can not find labourer by type: ", type)
            return null;
        }
    }
}

class T_LabourerBean {
	/**类型 */
	public type: LabourerType;
	/**移动速度 */
	public speed: number;
	/**工具类型 */
	public toolType: string;

	constructor(type: LabourerType, speed: number, toolType: string) {
		this.type = type;
		this.speed = speed;
		this.toolType = toolType;	
	}
}
