class SelfCheck {
  static selfCheck = (): void => {
    console.log('%casync-race', 'font-weight: bold; font-size: 18px');
    console.log('https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md\n\n');
    console.log('%cСамооценка:', 'font-weight: bold;');
    console.log(`
        Task: 190/190
        - [X] +25/25: Basic structure
          - [X] +5: Two views "Garage" and "Winners"
          - [X] +5: "Garage" view contains name, page number, and how many car user has in his garage
          - [X] +5: "Winners" view contains name, page number, and how many records the winners table contains
          - [X] +10: View state should be saved when user switches from one view to another
        - [X] +50/50: "Garage" view:
          - [X] +15: Can create, update, delete a car. Should be deleted from "garage" and "winners"
          - [X] +10: Can select any color and see the picture of the car colored with the color selected and car's name
          - [X] +5: Buttons to update car's attributes or delete it
          - [X] +10: There should be pagination on the "Garage" view (7 cars per one page)
          - [X] +10: A button to create 100 random cars per click. Name is assembled from 2 parts. Color is generated
        - [X] +50/50: Car animation
          - [X] +5: Near the car's picture should be buttons for starting / stopping the car engine
          - [X] +20: Start button -> wait for velocity -> car animation and request to drive. If "500 error" car is stopped
          - [X] +5: Engine stop button -> wait for answer for stop -> return car to start
          - [X] +5: Start-button is disabled if car is driving. Stop button is disabled when car is on it's initial place
          - [X] +15: Car animation should work fine on any screen (smallest screen size is 500px)
        - [X] +30/30: Race animation
          - [X] +10: A button to start race - all the cars on the current page start driving
          - [X] +10: A button to reset race - all the cars return to it's initial places
          - [X] +10: After a car finishes first - a message that shows which one has won
        - [X] +35/35: "Winners" view:
          - [X] +10: After some car wins it should be displayed at the "Winners view" table
          - [X] +5: There should be pagination (10 winners per page)
          - [X] +10: Columns: "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names can differ)
          - [X] +10: Sort cars by wins number and by best time (ASC, DESC)
        `);
  };
}
export default SelfCheck;
