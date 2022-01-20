import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FootballService {

  constructor(private http:HttpClient) { }
  private KEY = "d68473a5e8msh1aba6f9fbcc50f6p1beb4cjsn47eb34f144cb";
  private FIELD = "X-RapidAPI-Key";

 
  getAllSeasons() {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
    return this.http.get('https://api-football-v1.p.rapidapi.com/v3/leagues/seasons', {headers})
        .pipe(map((res) => {
            return res;
        }))
  }

  public getAllCountries() {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get('https://api-football-v1.p.rapidapi.com/v3/countries', {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  //Leagues
  public getAllLeagues() {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/leagues`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getLeagues(season?: number, country?: string) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/leagues?season=${season}&country=${country}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getLeaguesBySeason(season: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/leagues?season=${season}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getLeaguesById(id: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/leagues?id=${id}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  //Standings
  public getStandings(season: number, league: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }


  //Fixtures
  public getFixtures(season?: number, league?: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&league=${league}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getFixturesH2H(h2h: string) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${h2h}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getFixtureById(id: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${id}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getFixturesByTeamId(team: number, season: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${team}&season=${season}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  public getFixturesByDate(date: string, season?: number, league?: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      if (league) {
          return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&season=${season}&league=${league}`, {headers})
              .pipe(map((res) => {
                  return res;
              }))
      }
      else {
          return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&season=${season}`, {headers})
              .pipe(map((res) => {
                  return res;
              }))
      }
  }

  //Livescore
  //********************************************************************
  public getFixturesInProgress() {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  //Schedule
  //********************************************************************
  public getNextFixtures(next: number, league?: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      if (league) {
          return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?next=${next}&league=${league}`, {headers})
              .pipe(map((res) => {
                  return res;
              }))
      }
      else {
          return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?next=${next}`, {headers})
              .pipe(map((res) => {
                  return res;
              }))
      }
  }

  //Bookmaker - Nhà cái
  public getALlBookmaker() {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/odds/bookmakers`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }


  //Betting-odds
  public getOddsByDate(date: string, page: number, bookmaker: number) {
    const headers = new HttpHeaders().append(this.FIELD, this.KEY);
      return this.http.get(`https://api-football-v1.p.rapidapi.com/v3/odds?date=${date}&page=${page}&bookmaker=${bookmaker}`, {headers})
          .pipe(map((res) => {
              return res;
          }))
  }

  // public getBLVByFixtureId(listId: any) {
  //     return this.http.get(`${environment.apiUrl}/api/casting/getByFixtureId?listFixtureId=${JSON.stringify(listId)}`)
  //         .pipe(map((res) => {
  //             return res;
  //         }))
  // }

  // public getTodayCastings() {
  //     return this.http.get(`${environment.apiUrl}/api/casting/getTodayCastings`)
  //         .pipe(map((res) => {
  //             return res;
  //         }));
  // }
  public getPagingPosts(
    categoryId: number,
    pageIndex: number,
    pageSize: number,
    statusPost: number,
    keyword?: string
  ) {
    let url = "";
    if (keyword) {
      url =

        `https://api.xoso7789.com/api/Posts/paging?keyword=${keyword}&categoryId=${categoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}&statusPost=${statusPost}`;
    } else {
      url =

        `https://api.xoso7789.com/api/Posts/paging?categoryId=${categoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}&statusPost=${statusPost}`;
    }
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  public getPostDetail(slug: string) {
    let url = `https://api.xoso7789.com/api/Posts/getBySlug?slug=${slug}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  public getPostTags(numberOfTag: number, statusPost: number) {
    let url = `https://api.xoso7789.com/api/PostInTag/getAllPostInTags?numberOfTag=${numberOfTag}&statusPost=${statusPost}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  public getPostsByTagName(tagName: string, statusPost: number, pageIndex: number, pageSize: number) {
    let url = `https://api.xoso7789.com/api/PostInTag/getPostsByTagName?nameNoSign=${tagName}&statusPost=${statusPost}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  public getBannersByPostion(position: string) {
    return this.http.get(`https://api.xoso7789.com/api/Banner/getBannersByPosition?postion=${position}`)
    .pipe(map((res) => {
        return res;
    }))
  }
  public getNavItem(statusPost: number) {
    let url = `https://api.xoso7789.com/api/Categories?statusPost=${statusPost}`;
    return this.http.get(url)
        .pipe(map((res) => {
            return res;
        }))
  }
  getLiveBanner(position: string) {
    return this.http.get(`https://api.xoso7789.com/api/Banner/getBannersByPosition?postion=${position}`)
        .pipe(map((res) => {
            return res;
        }))
  }

  getCastingBySlug(slug: string) {
      return this.http.get(`https://api.xoso7789.com/api/casting/getBySlug?slug=${slug}`)
          .pipe(map((res) => {
              return res;
          }))
  }
  public getStreamStats(){
    let headers = new HttpHeaders({
        'Authorization': 'Basic YWRtaW46Nzg5YmV0QEA='
    });
    return this.http.get('https://chuyendongsanco.online/api/streams', { headers });
}
public getStream(streamName: string) {
  let headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW46Nzg5YmV0QEA='
  });
  return this.http.get("https://chuyendongsanco.online/api/streams/live/" + streamName, { headers });
}
}
