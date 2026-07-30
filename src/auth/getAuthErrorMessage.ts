export function getAuthErrorMessage(errorMessage: string, fallbackMessage: string): string {
  const normalizedMessage = errorMessage.toLowerCase();

  if (normalizedMessage.includes("invalid login credentials")) {
    return "E-mail ou senha inválidos.";
  }

  if (normalizedMessage.includes("user already registered")) {
    return "Este e-mail já está cadastrado.";
  }

  if (normalizedMessage.includes("password should be at least 6 characters")) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  if (normalizedMessage.includes("email rate limit exceeded")) {
    return "Muitas tentativas. Aguarde um momento e tente novamente.";
  }

  return fallbackMessage;
}
