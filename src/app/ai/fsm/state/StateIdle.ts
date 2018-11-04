class StateIdle extends StateBase {
    public owner: GoapAgent;
    public onEnter() {

    }
    /**
     * 状态更新 
     * @return 
     */		
    public onUpdate(timeStamp: number): void {
        let iGoap: IGoap = this.owner.getOwner();
        let planner: GoapPlanner = this.owner.getPlanner();
        let avaliableActions: GoapAction[] = this.owner.getAvaliableActions();
        console.log("avaliableActions: ", avaliableActions);
        // GOAP planning

        // get the world state and the goal we want to plan for
        let worldState: Map<string, Object> = iGoap.getWorldState();
        let goal: Map<string, Object> = iGoap.createGoalState();

        // plan
        let plan: GoapAction[] = planner.plan(iGoap, avaliableActions, worldState, goal);
        if(plan != null) {
            // we have a plan, hooray!
            this.owner.setCurrentActions(plan);
            iGoap.planFound(goal, plan);

            // move to PerformAction state
            this.owner.changeState(StateEnum.StatePerformAction);
        } else {
            console.log("Failed Plan");
            iGoap.planFailed(goal);
            this.owner.changeState(StateEnum.StateIdle);
        }
    }
}