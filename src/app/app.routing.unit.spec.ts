import { routes } from './app-routing.module';

describe('AppRoutes', () => {
  it('should contain a route for /', () => {
    expect(routes).toContain(
      {
        path: '',
        redirectTo: '/portal/dashboard/contracts',
        pathMatch: 'full',
        data: {
          breadcrumb: 'Contract Detail'
        }
      }
    );
  });

  it('should contain a route to / when no path is found', () => {
    expect(routes).toContain(
      {
        path: '**',
        redirectTo: 'not-found'
      }
    );
  });
});
