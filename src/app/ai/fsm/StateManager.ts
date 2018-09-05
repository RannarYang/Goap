/*
 * @Description: 状态管理类
 * @Author: Rannar.Yang 
 * @Date: 2018-06-29 10:16:55 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-07-05 17:35:31
 */

class StateManager {
	public static InvalidState: string = "Invalid";
	
	protected _stateDic: {[key: string]: StateBase};
	protected _currentState: StateBase = null;
	protected _lastState: StateBase = null;
	protected _owner: any;
	
	constructor(owner: any) {
		this._stateDic = {};
		this._owner = owner;
	}
	
	
	public isExist(stateKey: string): boolean {
		return !!this._stateDic[stateKey];
	}
	
	public getStateByKey(stateKey: string): StateBase {
		return this._stateDic[stateKey];
	}

	/**
	 * 注册状态 
	 * @param key
	 * @param state
	 * 
	 */		
	public registerState(key: string, state: StateBase):void {
		if(this._owner != state.owner) {
			console.warn("statemachine 与 state 所有者不一致");
			return;
		}
		this._stateDic[key] = state;
	}
	
	/**
	 * 移除状态 
	 * @param key
	 * 
	 */		
	public removeState(key:string):void {
		delete this._stateDic[key];
	}
	
	/**
	 * 改变状态 
	 * @param key
	 * @param obj
	 * @param isForce 当当前状态和要切换的状态相同时，是否强制切换状态
	 */		
	public changeState(key: string, obj: any = null, isForce = false):void {
		if(!isForce && this._currentState && this._currentState.getStateKey() == key) {
			return;
		}
		var newState: StateBase = this._stateDic[key];
		if (newState == null) {
			console.warn("unregister state type: " + key);
			return;
		}
		
		if (this._currentState != null) {
			this._currentState.onExit(newState.getStateKey());
		}
		
		this._lastState = this._currentState;
		this._currentState = newState;
		this._currentState.onEnter(obj);
	}
	
	public reEnterState(obj: any = null): void {
		if(this._currentState)
			this._currentState.onReEnter(obj);
	}
		
	/**
	 * 更新 
	 * 
	 */		
	public update(timeStamp): void {
		if (this._currentState != null)
			this._currentState.onUpdate(timeStamp);
	}
	
	/**
	 * 当前状态  
	 * @return 
	 */		
	public getCurrentState(): StateBase {
		return this._currentState;
	}
	/**
	 * 当前状态类型  
	 * @return 
	 */	
	public getCurrentStateKey(): string {
		if (this._currentState != null) {
			return this._currentState.getStateKey();
		}
		return StateManager.InvalidState;
	}

	/**当前在的状态 */
	public isInState(stateKey: string) {
		return stateKey == this.getCurrentStateKey();
	}
	/**
	 * 清除 
	 */		
	public clear():void {
		if (this._currentState != null)
			this._currentState.onExit(StateManager.InvalidState);
		this._stateDic = {};
		this._currentState = null;
		this._lastState = null;
	}
	/**清除最后的状态 */
	public dispose() {
		if (this._currentState != null)
			this._currentState.onExit(StateManager.InvalidState);
		this._currentState = null;
		this._lastState = null;
	}
	
}
