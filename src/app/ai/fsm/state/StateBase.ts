/*
 * @Description: 状态基类 
 * @Author: Rannar.Yang 
 * @Date: 2018-06-29 10:17:10 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-06-29 10:17:32
 */
class StateBase {
	
	protected _owner: any;
	
	public get owner(): any {
		return this._owner;
	}
	constructor(owner: any) {
		this._owner = owner;	
	}
	/**
	 * 进入状态 
	 */		
	public onEnter(obj: any = null): void {}
	
	/**
	 * 再次进入状态 
	 * @param obj
	 * @return 
	 */		
	public onReEnter(obj: any = null): void {}

	/**
	 * 状态更新 
	 * @return 
	 */		
	public onUpdate(timeStamp: number): void {}
	
	/**
	 * 离开状态结束 
	 * @param string
	 * @return 
	 * 
	 */		
	public onExit(preKey: string = undefined):void {}
	/**
	 * 返回状态ID 
	 * @return 
	 * 
	 */		
	public getStateKey(): string {
		return StateManager.InvalidState;	
	}
	
}
