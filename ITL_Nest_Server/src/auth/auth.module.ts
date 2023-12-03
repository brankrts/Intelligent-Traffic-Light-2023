import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./guards/jwt.guard";
import { RoleGuard } from "./guards/role.guard";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: "traffic_lights",
        signOptions: { expiresIn: "3600s" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
  exports: [AuthGuard, RoleGuard, AuthService],
})
export class AuthModule {}
