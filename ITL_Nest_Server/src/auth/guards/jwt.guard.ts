import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedException();
    try {
      const userDetails = this.authService.verifyJwt(token);
      request.user = userDetails;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
