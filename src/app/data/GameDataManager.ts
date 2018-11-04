/*
 * @Description: 游戏数据管理器
 * @Author: RannarYang 
 * @Date: 2018-11-03 19:02:46 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-11-03 19:03:42
 */
class GameDataManager {
	public t_labourderContainer: T_LabourerContainer = new T_LabourerContainer();
     /**单例 */
    private static instance: GameDataManager;
    public static get I(): GameDataManager {
        if(!this.instance) {
            this.instance = new GameDataManager();
        }
        return this.instance;
    }
}