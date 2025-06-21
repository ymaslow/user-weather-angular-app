import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.results;
      this.users.forEach(user => {
        const lat = parseFloat(user.location.coordinates.latitude);
        const lon = parseFloat(user.location.coordinates.longitude);
        this.weatherService.getWeather(lat, lon).subscribe(w => {
          user.weather = {
            current: w.current_weather.temperature,
            max: w.daily.temperature_2m_max[0],
            min: w.daily.temperature_2m_min[0],
            code: w.current_weather.weathercode
          };
        });
      });
    });
  }

  getIcon(code: number): string {
    if (code < 3) return '☀️ Сонячно';
    if (code < 50) return '⛅ Хмарно';
    if (code < 70) return '🌧️ Дощ';
    return '🌨️ Сніг';
  }
}