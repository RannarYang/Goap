/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-11-03 19:01:10 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-11-03 19:01:10 
 */
class ToolType {
	public static Axe: string = 'axe';
	public static Pick: string = 'pick';
	public static getSource(type: string) {
		return type + '_png';
	}
}