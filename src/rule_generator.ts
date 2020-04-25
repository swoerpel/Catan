import { Ruleset } from './ruleset.model';

export class RuleGenerator {

  private rule_sets = {
    'default': this.default(),
  }

  constructor(type){
    return this.rule_sets[type];
  }

  private default(): Ruleset{
    return {
      id:'default',
      resources: ['wood','sheep','wheat','stone','brick'],
      colors: ['darkgreen','lightgreen','yellow','grey','lightred']
    }
  }







}
